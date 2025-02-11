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


shouldDrawFrame() {
    return this instanceof Character || 
        this instanceof Chicken || 
        this instanceof Chick || 
        this instanceof BossChicken || 
        this instanceof ThrowableObject || 
        this instanceof Coin || 
        this instanceof TabascoBottle;
}

getAdjustedFrame() {
    let offsetX = this.offsetX || 0;
    let offsetY = this.offsetY || 0;
    return {
        x: this.x + offsetX,
        y: this.y + offsetY,
        width: this.width - 2 * offsetX,
        height: this.height - 2 * offsetY
    };
}

drawFrame(ctx) {
    if (!this.shouldDrawFrame()) return;

    let { x, y, width, height } = this.getAdjustedFrame();
    
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'transparent';
    ctx.rect(x, y, width, height);
    ctx.stroke();
}




loadImages(arr){
    arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imageCache[path] = img;
});
}


}