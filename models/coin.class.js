/**
 * Represents a collectible coin in the game.
 * Inherits from DrawableObject and includes an animation effect.
 */
class Coin extends DrawableObject {
    y = 300;
    x;
    width = 93;
    height = 93;
    offsetX = 30;
    offsetY = 30;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    loadedImages = [];
    currentImage = 0;

    /**
     * Creates a new Coin instance with a random X position.
     */
    constructor() {
        super();
        this.x = 350 + Math.random() * (2200 - 100);
        this.y = 335;

        this.preloadImages();
        this.animate();
    }

    /**
     * Preloads coin images to prevent flickering during animation.
     */
    preloadImages() {
        this.IMAGES_COIN.forEach((src, index) => {
            this.loadedImages[index] = new Image();
            this.loadedImages[index].src = src;
        });
    }
    /**
     * Animates the coin by switching between preloaded images.
     * The size changes slightly based on the current image.
     */
    animate() {
        setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.IMAGES_COIN.length; 
            this.img = this.loadedImages[this.currentImage];
            this.width = this.currentImage === 1 ? 96 : 93;
            this.height = this.currentImage === 1 ? 96 : 93;
        }, 500);
    }
    
}
