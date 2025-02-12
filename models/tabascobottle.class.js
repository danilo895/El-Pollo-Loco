/**
 * Represents a collectible Tabasco bottle in the game.
 * Inherits from DrawableObject and includes an animation effect.
 */
class TabascoBottle extends DrawableObject {
    y = 350;
    x = 250;
    width = 75;
    height = 105;
    offsetX = 30;
    offsetY = 10;
    IMAGES_TABASCOBOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    loadedImages = [];
    currentImage = 0;

    /**
     * Creates a new TabascoBottle instance with a random X position.
     */
    constructor() {
        super();
        this.x = 300 + Math.random() * (1600 - 100);

        this.preloadImages();
        this.animate();
    }

    /**
     * Preloads Tabasco bottle images to prevent flickering during animation.
     */
    preloadImages() {
        this.IMAGES_TABASCOBOTTLE.forEach((src, index) => {
            this.loadedImages[index] = new Image();
            this.loadedImages[index].src = src;
        });
    }

    /**
     * Animates the Tabasco bottle by switching between preloaded images.
     */
    animate() {
        setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.IMAGES_TABASCOBOTTLE.length;
            this.img = this.loadedImages[this.currentImage];
        }, 500);
    }
    
}
