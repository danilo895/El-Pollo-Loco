/**
 * Represents a throwable Tabasco bottle in the game.
 * Inherits from MovableObject and includes physics, rotation, and collision detection.
 */
class ThrowableObject extends MovableObject {
    rotationAngle = 0;
    IMAGES_BOTTLESPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    /**
     * Creates a new ThrowableObject instance.
     * @param {number} x - The initial X position of the bottle.
     * @param {number} y - The initial Y position of the bottle.
     * @param {Object} world - The game world reference.
     */
    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLESPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.world = world;
        this.throw();
        this.startRotation();
        this.trackPosition();
    }

    /**
     * Initiates the throwing motion of the bottle, applying horizontal movement.
     */
    throw() {
        this.speedY = 25;
        this.applyGravityBottle(); 
    
        let direction = this.world.character.otherDirection ? -1 : 1;
    
        throwSound.currentTime = 0;
        throwSound.play();
    
        this.throwInterval = setInterval(() => {
            this.x += 12 * direction;
            if (this.y > 720 || this.x < 0) {
                this.removeBottle();
            }
        }, 25);
    }
    
    /**
     * Applies gravity to the thrown bottle, making it follow a parabolic trajectory.
     */
    applyGravityBottle() {
        this.acceleration = 2; 
        let gravityInterval = setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.speedY < 0) {
                this.speedY -= this.acceleration;
            }
            if (this.y > 720) {
                clearInterval(gravityInterval);
                this.removeBottle();
            }
        }, 1000 / 25);
    }
    
    /**
     * Starts the rotation animation for the bottle.
     */
    startRotation() {
        this.rotationInterval = setInterval(() => {
            this.rotationAngle += 15;
            if (this.rotationAngle >= 360) {
                this.rotationAngle = 0; 
            }
        }, 40);
    }

    /**
     * Stops the rotation of the bottle.
     */
    stopRotation() {
        clearInterval(this.rotationInterval);
    }

    /**
     * Tracks the bottle's position and checks for collisions continuously.
     */
    trackPosition() {
        requestAnimationFrame(() => this.checkCollisions());
    }
    
    /**
     * Checks for collisions between the thrown bottle and enemies.
     */
    checkCollisions() {
        if (this.isRemoved) return;
        if (!this.isGameValid()) return;
        this.world.level.enemies.forEach((enemy) => {
            if (this.shouldIgnoreCollision(enemy)) return;
            if (this.isCollidingWithEnemy(enemy)) {
                this.handleCollision(enemy);
            }
        });
    
        this.checkOutOfBounds();
        requestAnimationFrame(() => this.checkCollisions());
    }
    
    /**
     * Validates if the game world and enemies are available before checking collisions.
     * @returns {boolean} True if the game world is valid, otherwise false.
     */
    isGameValid() {
        if (!this.world || !this.world.level || this.world.level.enemies.length === 0) {
            return false;
        }
        return true;
    }
    
    /**
     * Determines if a collision with a specific enemy should be ignored.
     * @param {Object} enemy - The enemy object to check.
     * @returns {boolean} True if the collision should be ignored, otherwise false.
     */
    shouldIgnoreCollision(enemy) {
        if (enemy instanceof BossChicken && enemy.isDead) {
            return true;
        }
        return false;
    }

    /**
     * Handles collision logic when the bottle hits an enemy.
     * @param {Object} enemy - The enemy object that was hit.
     */
    handleCollision(enemy) {
        if (!(enemy instanceof Chick || enemy instanceof Chicken || enemy instanceof BossChicken)) {
            return;
        }
    
        if (!enemy.hasBeenHit) {
            enemy.hasBeenHit = true;
    
            if (enemy instanceof BossChicken) {
                this.handleBossCollision(enemy);
            } else {
                this.handleRegularEnemyCollision(enemy);
            }
            this.playSplashAnimation(this.x, this.y);
    
            this.removeBottle();
        }
    }

    /**
 * Plays the bottle splash animation at a specific position.
 * @param {number} x - X coordinate where the splash should occur.
 * @param {number} y - Y coordinate where the splash should occur.
 */
playSplashAnimation(x, y) {
    let splash = new DrawableObject(); // Erstelle eine temporäre Animation
    splash.x = x;
    splash.y = y;
    splash.width = 48; // Größe der Splash-Animation
    splash.height = 48;
    let imgIndex = 0;

    let splashInterval = setInterval(() => {
        if (imgIndex < this.IMAGES_BOTTLESPLASH.length) {
            splash.img = this.imageCache[this.IMAGES_BOTTLESPLASH[imgIndex]];
            imgIndex++;
        } else {
            clearInterval(splashInterval);
            this.world.level.enemies.splice(this.world.level.enemies.indexOf(splash), 1);
        }
    }, 100);
    this.world.level.enemies.push(splash);
}

    
    
    /**
     * Handles the bottle collision with the boss enemy.
     * Reduces the boss's health and triggers animations or removal.
     * @param {Object} enemy - The boss enemy object.
     */
    handleBossCollision(enemy) { 
        this.world.statusBarEndboss.reduceHealth(20);
        if (this.world.statusBarEndboss.percentageEndboss <= 0 && !enemy.isDead) {
            enemy.removeEnemy();
        } else {
            enemy.playHurtAnimation();
        }
    
        if (!enemy.isDead) {
            setTimeout(() => {
                enemy.hasBeenHit = false;
            }, 1000);
        }
    }
    
        /**
     * Handles the bottle collision with regular enemies (Chickens & Chicks).
     * Removes the enemy from the game.
     * @param {Object} enemy - The enemy object.
     */
    handleRegularEnemyCollision(enemy) {
        this.stopRotation();
        
        if (enemy instanceof Chick || enemy instanceof Chicken) { 
            enemy.replaceWithDeadEnemy(); 
    
        }
    }
    
    /**
     * Checks if the charac has gone out of bounds and removes it if necessary.
     */
    checkOutOfBounds() {
        if (this.y > 500 || this.x < 0) {
            this.removeBottle();
        }
    }

    /**
     * Draws the bottle on the canvas, applying rotation.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotationAngle * Math.PI / 180);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
        super.draw(ctx);
        ctx.restore();
    }

    /**
     * Removes the bottle from the game and clears associated intervals.
     */
    removeBottle() {
        clearInterval(this.throwInterval);
        clearInterval(this.rotationInterval);
        this.isRemoved = true;
        let index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
    

    /**
     * Checks if the bottle is colliding with an enemy.
     * @param {Object} enemy - The enemy object to check.
     * @returns {boolean} True if the bottle collides with the enemy, otherwise false.
     */
    isCollidingWithEnemy(enemy) {
        let bottleCenterX = this.x + this.width / 2;
        let bottleCenterY = this.y + this.height / 2;

        let enemyCenterX = enemy.x + enemy.width / 2;
        let enemyCenterY = enemy.y + enemy.height / 2;

        let dx = Math.abs(bottleCenterX - enemyCenterX);
        let dy = Math.abs(bottleCenterY - enemyCenterY);
        let collision = (dx < (this.width / 2 + enemy.width / 2)) &&
                    (dy < (this.height / 2 + enemy.height / 2));
        return collision;
    }
}
