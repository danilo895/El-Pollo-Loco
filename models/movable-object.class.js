class MovableObject{
    x = 120;
    y = 280;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    img;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; // Beschleunigung
    energy = 100;

    applyGravity(){
        setInterval(()=>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        },1000/25)
    }

    isAboveGround(){
        return this.y < 180;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    }


    isColliding(mo) {
        return  (this.x + this.offsetX + this.width > mo.x + mo.offsetX) &&
                (this.y + this.offsetY + this.height > mo.y + mo.offsetY) &&
                (this.x + this.offsetX < mo.x + mo.width + mo.offsetX) &&
                (this.y + this.offsetY < mo.y + mo.height + mo.offsetY);
    }
    
    hit(){
        this.energy -= 5;
        console.log('energy is now at ', this.energy);
        if(this.energy < 0){
            this.energy = 0;
            console.log('Game Over');
        }
        else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        console.log(timepassed);
        return timepassed < 1;
    }

    isDead(){   
        return this.energy == 0;
    }

    loadImages(arr){
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
    }


    playAnimation(images){
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
}