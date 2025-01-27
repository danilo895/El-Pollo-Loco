class Coin extends DrawableObject{
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.x = 140;
    this.y = 300;
    this.height = 80;
    this.width = 80;
}




}