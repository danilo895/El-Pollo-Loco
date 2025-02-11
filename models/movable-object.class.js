class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; // Beschleunigung
    energy = 100;
    lastHit = 0;

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
    
    

    isAboveGround() {
        return this.y < 250;
    }
    
    


    isColliding(mo) {
        return  (this.x + this.offsetX + (this.width - 2 * Math.abs(this.offsetX)) > mo.x + mo.offsetX) &&
                (this.y + this.offsetY + (this.height - 2 * Math.abs(this.offsetY)) > mo.y + mo.offsetY) &&
                (this.x + this.offsetX < mo.x + mo.offsetX + (mo.width - 2 * Math.abs(mo.offsetX))) &&
                (this.y + this.offsetY < mo.y + mo.offsetY + (mo.height - 2 * Math.abs(mo.offsetY)));
    }
    
    
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            playHurtSound();
        }
    }
    

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead(){   
        return this.energy == 0;
    }


    playAnimation(images) {
        if (this instanceof BossChicken && this.isDead) return; 
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
            this.x -= this.speed;
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 30; 
            jumpSound.currentTime = 0;
            jumpSound.play();
        }
    }

    getCollisionPoints() {
        let horizontalTolerance = 5;
        return {
            bottomMiddleX: this.x + this.width / 2,
            bottomLeftX: this.x + horizontalTolerance, 
            bottomRightX: this.x + this.width - horizontalTolerance,
            bottomY: this.y + this.height
        };
    }
    
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