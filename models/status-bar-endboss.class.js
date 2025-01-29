class StatusBarEndboss extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png'
    ];
    percentageEndboss = 100;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.img = this.imageCache[this.IMAGES[0]];
    }


}