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
    
    isJumpingOnEnemy(enemy) {
        // Charakter-Hitbox
        let characterTop = this.y + this.offsetY;
        let characterBottom = this.y + this.height + this.offsetY;
        let characterLeft = this.x + this.offsetX;
        let characterRight = this.x + this.width + this.offsetX;
    
        // Gegner-Hitbox
        let enemyTop = enemy.y + enemy.offsetY;
        let enemyBottom = enemy.y + enemy.height + enemy.offsetY;
        let enemyLeft = enemy.x + enemy.offsetX;
        let enemyRight = enemy.x + enemy.width + enemy.offsetX;
    
        // Toleranzen für bessere Erkennung
        let verticalTolerance = 5;  // Falls der Charakter leicht über dem Gegner ist
        let horizontalTolerance = 0; // Falls der Charakter den Rand des Gegners trifft
    
        // Horizontale Kollision (mit Toleranz)
        let horizontalCollision =
            characterRight > (enemyLeft - horizontalTolerance) &&
            characterLeft < (enemyRight + horizontalTolerance);
    
        // Vertikale Kollision (Charakter muss über dem Gegner sein)
        let verticalCollision =
            characterBottom >= enemyTop - verticalTolerance &&
            characterBottom < enemyBottom;
    
        // Prüfen, ob der Charakter tatsächlich nach unten fällt
        let isFalling = this.speedY < 0;
    
        // Debugging-Logs, falls Kollision nicht erkannt wird
        console.log("=============================");
        console.log(`Character Bottom: ${characterBottom}, Enemy Top: ${enemyTop}`);
        console.log(`Character Left: ${characterLeft}, Character Right: ${characterRight}`);
        console.log(`Enemy Left: ${enemyLeft}, Enemy Right: ${enemyRight}`);
        console.log(`Horizontal Collision: ${horizontalCollision}`);
        console.log(`Vertical Collision: ${verticalCollision}`);
        console.log(`Is Falling: ${isFalling}`);
    
        if (horizontalCollision && verticalCollision && isFalling) {
            console.warn("✅ HIT DETECTED: Character jumps on enemy!");
            return true;
        }
    
        return false;
    }
    
    
    
    
    
    
    
    
    
    
    
}