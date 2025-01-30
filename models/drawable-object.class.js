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

draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

}

drawFrame(ctx){
    if(this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof BossChicken || this instanceof ThrowableObject || this instanceof Coin || this instanceof TabascoBottle ){
    ctx.beginPath();
    ctx.lineWidth = '4';
    ctx.strokeStyle = 'cyan';
    ctx.rect(this.x, this.y, this.width, this.height);
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