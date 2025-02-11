/**
 * Represents a background object in the game.
 * Inherits from MovableObject.
 */
class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;
    
    /**
     * Creates a new background object.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The X position of the background.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}