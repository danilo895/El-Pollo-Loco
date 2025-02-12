/**
 * Represents the status bar for collected coins in the game.
 * Inherits from DrawableObject and updates dynamically based on the collected coin percentage.
 */
class StatusBarCoin extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    percentageCoin = 0;

/**
* Creates a new StatusBarCoin instance and initializes its position and image.
*/
constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 40;
    this.width = 200;
    this.height = 50;
    this.setPercentage(0);
}


/**
* Updates the status bar based on the collected coin percentage.
* @param {number} percentageCoin - The current percentage of collected coins.
*/
setPercentage(percentageCoin) {
    this.percentageCoin = percentageCoin;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
}

/**
* Updates the status bar based on the collected coin percentage.
* @param {number} percentageCoin - The current percentage of collected coins.
*/
resolveImageIndex(){
    if(this.percentageCoin == 100){
        return 5;
    } else if (this.percentageCoin > 80){
        return 4;
    }
    else if(this.percentageCoin > 60){
        return 3;
    }
    else if(this.percentageCoin > 40){
        return 2;
    }
    else if(this.percentageCoin > 20){
        return 1;
    }
    else{
        return 0;
    }
}

}