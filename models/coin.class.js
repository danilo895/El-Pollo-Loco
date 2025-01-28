class Coin extends DrawableObject {
    y = 300;
    x = 900; 

    // Array mit den beiden Bild-Dateien für die Animation
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    currentImage = 0; // Hilfsvariable für das Wechseln der Bilder

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.animate(); // Start der Animation
    }

    animate() {
        setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.IMAGES_COIN.length; 
            this.loadImage(this.IMAGES_COIN[this.currentImage]);
            if (this.currentImage === 1) {
                this.width = 96;  // Bild 2 - kleiner
                this.height = 96; // Bild 2 - kleiner
            } else {
                this.width = 93;  // Bild 1 - größer
                this.height = 93; // Bild 1 - größer
            }

        }, 300); 
    }
}
