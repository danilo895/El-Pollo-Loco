/**
 * Represents the health status bar for the endboss in the game.
 * Inherits from DrawableObject and updates dynamically based on the endboss's health.
 */
class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png', 
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',  
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',  
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',  
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',  
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png'    
    ];
    percentageEndboss = 100; 

    /**
     * Creates a new StatusBarEndboss instance and initializes its position and image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 350;
        this.y = 5;
        this.width = 180;
        this.height = 50;
        this.img = this.imageCache[this.IMAGES[0]];
    }

    /**
     * Reduces the endboss's health by a given amount and updates the status bar image.
     * @param {number} amount - The amount of health to reduce.
     */
    reduceHealth(amount) {
        if (this.percentageEndboss > 0) {
            this.percentageEndboss -= amount;
        }
        
        if (this.percentageEndboss < 0) {
            this.percentageEndboss = 0;
        }
        let imageIndex = this.getHealthImageIndex();
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }

    /**
     * Determines the correct image index based on the endboss's health percentage.
     * @returns {number} The index of the appropriate status bar image.
     */
    getHealthImageIndex() {
        if (this.percentageEndboss > 80) return 0;
        if (this.percentageEndboss > 60) return 1;
        if (this.percentageEndboss > 40) return 2;
        if (this.percentageEndboss > 20) return 3;
        if (this.percentageEndboss > 0) return 4;
        return 5;
    }
}
