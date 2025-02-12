/**
 * Represents a drawable object in the game.
 * Provides methods for image loading, rendering, and frame adjustments.
 */
class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 120;

/**
* Loads an image for the object.
* @param {string} path - The path to the image.
*/
loadImage(path){
    this.img = new Image();
    this.img.src = path;
}

/**
* Draws the object on the canvas.
* @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
*/
draw(ctx) {
    if (!this.img || !this.imageCache) {
        return;
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

/**
* Determines if the object should have a visible frame for debugging.
* @returns {boolean} True if the object should have a frame, otherwise false.
*/
shouldDrawFrame() {
    return this instanceof Character || 
        this instanceof Chicken || 
        this instanceof Chick || 
        this instanceof BossChicken || 
        this instanceof ThrowableObject || 
        this instanceof Coin || 
        this instanceof TabascoBottle;
}

/**
* Gets the adjusted frame dimensions, considering offsets.
* @returns {Object} An object containing x, y, width, and height.
*/
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

/**
* Draws a frame around the object if applicable (used for debugging).
* @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
*/
drawFrame(ctx) {
    if (!this.shouldDrawFrame()) return;
    let { x, y, width, height } = this.getAdjustedFrame();
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'transparent';
    ctx.rect(x, y, width, height);
    ctx.stroke();
}

/**
* Loads multiple images into the image cache.
* @param {string[]} arr - An array of image paths to load.
*/
loadImages(arr){
    arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imageCache[path] = img;
});
}

}