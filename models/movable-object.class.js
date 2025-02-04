class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; // Beschleunigung
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(()=>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        },1000/25)
    }

    isAboveGround(){
        if(this instanceof ThrowableObject){ 
            return true;
        }else{
        return this.y < 200;
    }
    }


    isColliding(mo) {
        return  (this.x + this.offsetX + (this.width - 2 * Math.abs(this.offsetX)) > mo.x + mo.offsetX) &&
                (this.y + this.offsetY + (this.height - 2 * Math.abs(this.offsetY)) > mo.y + mo.offsetY) &&
                (this.x + this.offsetX < mo.x + mo.offsetX + (mo.width - 2 * Math.abs(mo.offsetX))) &&
                (this.y + this.offsetY < mo.y + mo.offsetY + (mo.height - 2 * Math.abs(mo.offsetY)));
    }
    
    
    hit(){
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        }
        else{
            this.lastHit = new Date().getTime();
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

    jump(){
        this.speedY = 30;
    }

    isJumpingOnEnemy(mo) {
        let characterBottom = this.y + this.height;
        let enemyTop = mo.y; 
    
        let horizontalCollision =
            (this.x + this.offsetX + this.width > mo.x + mo.offsetX) &&
            (this.x + this.offsetX < mo.x + mo.width + mo.offsetX); 
    
        let verticalCollision = characterBottom >= enemyTop;
        let isFalling = this.speedY < 0;
        return horizontalCollision && verticalCollision && isFalling;
    }
    
    
    
    
}