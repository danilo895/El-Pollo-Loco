class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to make the object fall until it reaches the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 250;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }
    
    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if above ground, otherwise false.
     */
    isAboveGround() {
        return this.y < 250;
    }
    
    /**
     * Checks if this object collides with another.
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        return  (this.x + this.offsetX + (this.width - 2 * Math.abs(this.offsetX)) > mo.x + mo.offsetX) &&
                (this.y + this.offsetY + (this.height - 2 * Math.abs(this.offsetY)) > mo.y + mo.offsetY) &&
                (this.x + this.offsetX < mo.x + mo.offsetX + (mo.width - 2 * Math.abs(mo.offsetX))) &&
                (this.y + this.offsetY < mo.y + mo.offsetY + (mo.height - 2 * Math.abs(mo.offsetY)));
    }
    
    /**
     * Reduces the object's energy when hit and plays a hurt sound.
     */    
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            playHurtSound();
        }
    }
    
    /**
     * Checks if the object was recently hit.
     * @returns {boolean} True if hit within the last second, otherwise false.
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is out of energy (dead).
     * @returns {boolean} True if energy is 0, otherwise false.
     */
    isDead(){   
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through the given image array.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        if (this instanceof BossChicken && this.isDead) return; 
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    /**
     * Moves the object to the right.
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft(){
            this.x -= this.speed;
    }

    /**
     * Makes the object jump if it is on the ground.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 30; 
            jumpSound.currentTime = 0;
            jumpSound.play();
        }
    }

    /**
     * Gets key collision points at the bottom of the object.
     * @returns {Object} Collision points including bottom middle, left, right, and Y position.
     */
    getCollisionPoints() {
        let horizontalTolerance = 5;
        return {
            bottomMiddleX: this.x + this.width / 2,
            bottomLeftX: this.x + horizontalTolerance, 
            bottomRightX: this.x + this.width - horizontalTolerance,
            bottomY: this.y + this.height
        };
    }
    
    /**
     * Checks if the object is jumping on an enemy.
     * @param {MovableObject} enemy - The enemy object. (Chicken or Chick)
     * @returns {boolean} True if jumping on the enemy, otherwise false.
     */
    isJumpingOnEnemy(enemy) {
        let { bottomMiddleX, bottomLeftX, bottomRightX, bottomY } = this.getCollisionPoints();
        let horizontalTolerance = 5;
        let verticalTolerance = 5;
        let isColliding =
            (
                (bottomMiddleX > enemy.x + enemy.offsetX - horizontalTolerance &&
                bottomMiddleX < enemy.x + enemy.offsetX + enemy.width + horizontalTolerance) ||
                (bottomLeftX > enemy.x + enemy.offsetX - horizontalTolerance &&
                bottomLeftX < enemy.x + enemy.offsetX + enemy.width + horizontalTolerance) ||
                (bottomRightX > enemy.x + enemy.offsetX - horizontalTolerance &&
                bottomRightX < enemy.x + enemy.offsetX + enemy.width + horizontalTolerance)
            ) &&
            (bottomY > enemy.y + enemy.offsetY - verticalTolerance) &&
            (bottomY < enemy.y + enemy.offsetY + enemy.height);
        let isFalling = this.speedY < 0;
        return isColliding && isFalling;
    }
    
}