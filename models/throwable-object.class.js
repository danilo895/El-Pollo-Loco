class ThrowableObject extends MovableObject {
    rotationAngle = 0; // 🌀 Startwinkel für die Drehung

    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.world = world;
        this.throw();
        this.startRotation();
        this.trackPosition();
    }

    throw() {
        this.speedY = 30; 
        this.applyGravity();
        
        let direction = this.world.character.otherDirection ? -1 : 1;
    
        throwSound.currentTime = 0;
        throwSound.play()
    
        this.throwInterval = setInterval(() => {
            this.x += 10 * direction;
            if (this.y > 500 || this.x < 0) {
                this.removeBottle();
            }
        }, 25);
    }
    


    startRotation() {
        this.rotationInterval = setInterval(() => {
            this.rotationAngle += 10;
            if (this.rotationAngle >= 360) {
                this.rotationAngle = 0; 
            }
        }, 50);
    }

    stopRotation() {
        clearInterval(this.rotationInterval);
    }

    trackPosition() {
        requestAnimationFrame(() => this.checkCollisions());
    }
    
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
    
    
    isGameValid() {
        if (!this.world || !this.world.level || this.world.level.enemies.length === 0) {
            return false;
        }
        return true;
    }
    

    shouldIgnoreCollision(enemy) {
        if (enemy instanceof BossChicken && enemy.isDead) {
            return true;
        }
        return false;
    }
    
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
    
            this.removeBottle();
        }
    }
    
    
    

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
    
    handleRegularEnemyCollision(enemy) {
        this.stopRotation();
        
        if (enemy instanceof Chick || enemy instanceof Chicken) { 
            enemy.replaceWithDeadEnemy(); 
    
        }
    }
    
    
    

    checkOutOfBounds() {
        if (this.y > 500 || this.x < 0) {
            this.removeBottle();
        }
    }


    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotationAngle * Math.PI / 180);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
        super.draw(ctx);
        ctx.restore();
    }

    removeBottle() {
        clearInterval(this.throwInterval);
        clearInterval(this.rotationInterval);
        this.isRemoved = true;
        let index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
    


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
