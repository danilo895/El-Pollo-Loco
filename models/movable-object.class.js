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
    

    isJumpingOnEnemy(mo) {
        let characterBottom = this.y + this.height;
        let enemyTop = mo.y;
        let enemyBottom = enemyTop + mo.height;
    
        let verticalTolerance = 30;
        let horizontalTolerance = 0;
    
        let horizontalCollision =
            (this.x + this.offsetX + this.width > mo.x + mo.offsetX - horizontalTolerance) &&
            (this.x + this.offsetX < mo.x + mo.width + mo.offsetX + horizontalTolerance); 
    
        let verticalCollision = 
            characterBottom >= enemyTop - verticalTolerance && 
            characterBottom < enemyBottom; 
    
        let isFalling = this.speedY < 0; 
        if (isFalling) {
            console.log("=== Collision Debugging (Character is Falling) ===");
            console.log(`Character Bottom: ${characterBottom}`);
            console.log(`Enemy Top: ${enemyTop}`);
            console.log(`Enemy Bottom: ${enemyBottom}`);
            console.log(`Character X: ${this.x}, Character Width: ${this.width}`);
            console.log(`Enemy X: ${mo.x}, Enemy Width: ${mo.width}`);
            console.log(`Horizontal Collision: ${horizontalCollision}`);
            console.log(`Vertical Collision: ${verticalCollision}`);
            console.log(`Is Falling: ${isFalling}`);
        }
        if (horizontalCollision && verticalCollision && isFalling) {
            console.warn("JUMP ON ENEMY DETECTED! Pausing execution...");
            //debugger;
            return true;
        }
        
        return false;
    }
    
    
    
    
    
    
    
    
}