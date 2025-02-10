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
            playHurtSound(); // Statt direkt `hurtSound.play();`
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
    
    isJumpingOnEnemy(enemy) {
        let characterTop = this.y + this.offsetY;
        let characterBottom = this.y + this.height + this.offsetY;
        let characterLeft = this.x + this.offsetX;
        let characterRight = this.x + this.width - this.offsetX;
        let enemyTop = enemy.y + enemy.offsetY;
        let enemyBottom = enemy.y + enemy.height + enemy.offsetY;
        let enemyLeft = enemy.x + enemy.offsetX;
        let enemyRight = enemy.x + enemy.width - enemy.offsetX;
        let horizontalCollision = characterRight >= enemyLeft && characterLeft < enemyRight;
        let verticalCollision = characterBottom >= enemyTop && characterTop < enemyBottom;
        let isFalling = this.speedY < 0;
        return horizontalCollision && verticalCollision && isFalling;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
}