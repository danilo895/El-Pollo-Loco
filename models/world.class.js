/**
 * Represents the game world, managing the character, enemies, objects, and interactions.
 * Handles rendering, collision detection, and game logic execution.
 */
class World{
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lastHit=0;
    hitCooldown = 500;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];

    /**
     * Creates a new World instance and initializes game logic.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference for the character and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (typeof enemy.setWorld === 'function') {
                enemy.setWorld(this);
            }
        });
    }
    
    /**
     * Runs the main game loop with collision detection and object interactions.
     */
    run() {
        setInterval(() => {
            this.checkCoinCollision();
            this.checkBottleCollision();
            this.checkThrowObjects();
        }, 200);
    
        setInterval(() => {
            this.checkCollisions();
        }, 50);
    }
    
    
    /**
     * Checks if the player has thrown a Tabasco bottle and adds it to the world.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottle.collectedBottles > 0) { 
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.count(this.statusBarBottle.collectedBottles - 1);
        } 
    }
    
    
    /**
     * Checks if the character has collected a coin.
     * If so, removes it from the world and updates the status bar.
     */
    checkCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentageCoin + 20);              
                coinSound.currentTime = 0;
                coinSound.play()
            }
        });
    }

    /**
     * Checks if the character has collected a Tabasco bottle.
     * If so, removes it from the world and updates the status bar.
     */
    checkBottleCollision() {
        this.level.tabascoBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.tabascoBottles.splice(index, 1);
                this.statusBarBottle.count(this.statusBarBottle.collectedBottles + 1); 
                bottleCollectSound.currentTime = 0;
                bottleCollectSound.play()
                
            }
        });
    }
    
    /**
     * Checks for collisions between the character and enemies.
     * Handles damage, jumping on enemies, and enemy elimination.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.isAboveGround()) { 
                if (this.character.isColliding(enemy)) {
                    let currentTime = new Date().getTime();
                    if (currentTime - this.lastHit > this.hitCooldown) { 
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                        this.lastHit = currentTime;
                    }
                }
            } 
            else if (this.character.isJumpingOnEnemy(enemy) && !(enemy instanceof BossChicken)) { 
                enemy.replaceWithDeadEnemy();
            }
        });
    }

    /**
     * Draws all game elements onto the canvas.
     */
    draw() {
        if (!world) return;
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground(); // Hintergrund zeichnen
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.drawGameObjects(); // Spielfiguren & Objekte zeichnen
        this.ctx.translate(-this.camera_x, 0);
        this.drawUI();
        this.requestNextFrame();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }
    
    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
    }
    
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.tabascoBottles);
    }
    
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
    
    /**
     * Adds an array of objects to the game map.
     * @param {DrawableObject[]} objects - The objects to be added.
     */
    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the game map, considering direction.
     * @param {DrawableObject} mo - The object to be added.
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection){
        this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object horizontally for correct rendering when facing left.
     * @param {DrawableObject} mo - The object to flip.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width,0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object's position after flipping.
     * @param {DrawableObject} mo - The object to restore.
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}