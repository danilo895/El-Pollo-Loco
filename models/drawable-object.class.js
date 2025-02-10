class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 120;


loadImage(path){
    this.img = new Image();
    this.img.src = path;
}

draw(ctx) {
    if (!this.img || !this.imageCache) {
        return;
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


drawFrame(ctx) {
    if (
        this instanceof Character || 
        this instanceof Chicken || 
        this instanceof Chick || 
        this instanceof BossChicken || 
        this instanceof ThrowableObject || 
        this instanceof Coin || 
        this instanceof TabascoBottle
    ) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'black';

        let adjustedX = this.x + (this.offsetX || 0);
        let adjustedY = this.y + (this.offsetY || 0);
        let adjustedWidth = this.width - 2 * (this.offsetX || 0);
        let adjustedHeight = this.height - 2 * (this.offsetY || 0);

        ctx.rect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
        ctx.stroke();
    }
}



loadImages(arr){
    arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imageCache[path] = img;
});
}


}