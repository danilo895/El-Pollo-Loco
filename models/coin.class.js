class Coin extends DrawableObject {
    y = 300;
    x;
    width;
    height;
    offsetX = 30;
    offsetY = 30;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    currentImage = 0;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 350 + Math.random() * (2200 - 100);
        this.y = 335;

        this.animate();

    }

    animate() {
        setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.IMAGES_COIN.length; 
            this.loadImage(this.IMAGES_COIN[this.currentImage]);
            if (this.currentImage === 1) {
                this.width = 96;
                this.height = 96;
            } else {
                this.width = 93;
                this.height = 93;
            }
        }, 300); 
    }
}
