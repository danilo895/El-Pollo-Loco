/**
 * Represents the player's health status bar in the game.
 * Inherits from DrawableObject and updates dynamically based on the player's health percentage.
 */
class StatusBar extends DrawableObject{

IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
];
percentage = 100;
/**
* Creates a new StatusBar instance and initializes its position and image.
*/
constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
}

/**
* Updates the status bar based on the player's health percentage.
* @param {number} percentage - The current health percentage.
*/
setPercentage(percentage){
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
}

/**
 * Determines the correct image index based on the player's health percentage.
 * @returns {number} The index of the appropriate status bar image.
 */
resolveImageIndex(){
    if(this.percentage == 100){
        return 5;
    } else if (this.percentage > 80){
        return 4;
    }
    else if(this.percentage > 60){
        return 3;
    }
    else if(this.percentage > 40){
        return 2;
    }
    else if(this.percentage > 20){
        return 1;
    }
    else{
        return 0;
    }
}

}