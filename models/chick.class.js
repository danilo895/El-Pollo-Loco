/**
 * Represents a small chick enemy in the game.
 * Inherits from MovableObject and moves automatically to the left.
 */
class Chick extends MovableObject {
    y = 380;
    height = 45;
    width = 55;    
    offsetX = 5;
    offsetY = 0;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Creates a new Chick instance with a random X position and speed.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 1900;
        this.speed = 0.2 + Math.random() * 0.2;
        this.animate();
    }

    /**
     * Sets the reference to the game world.
     * @param {Object} world - The game world object.
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Starts movement and animation for the chick.
     * Moves left continuously and plays walking animation.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Replaces the alive chick with a dead chick when destroyed.
     * Plays a destruction sound and removes the chick from the game.
     */
    replaceWithDeadEnemy() {
        destroyChickenSound.currentTime = 0;
        destroyChickenSound.play();
        let deadImagePath = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        let deadEnemy = new DeadEnemy(this.x, this.y, this.width, this.height, deadImagePath, this.world);
        this.world.level.enemies.push(deadEnemy); 

        let index = this.world.level.enemies.indexOf(this);
        if (index !== -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }

    /**
     * Handles the impact when the chick is hit by a bottle.
     * Stops movement and removes the chick after a short delay.
     */
    handleBottleHit() {
        let deadImagePath = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        this.loadImage(deadImagePath);
        this.speed = 0;
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 500);
    }
}
