/**
 * Represents a normal chicken enemy in the game.
 * Inherits from MovableObject and moves automatically to the left.
 */
class Chicken extends MovableObject {
    y = 370;
    height = 65; 
    width = 85;
    offsetX = 5;
    offsetY = 0;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Creates a new Chicken instance with a random X position and speed.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 600 + Math.random() * 2100;
        this.speed = 0.1 + Math.random() * 0.8;
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
     * Starts movement and animation for the chicken.
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
     * Replaces the chicken with a dead chicken when destroyed.
     * Plays a destruction sound and removes the chicken from the game.
     */
    replaceWithDeadEnemy() {
        let deadImagePath = this instanceof Chick
            ? 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
            : 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
        let deadEnemy = new DeadEnemy(this.x, this.y, this.width, this.height, deadImagePath, this.world);
        this.world.level.enemies.push(deadEnemy);
        destroyChickenSound.currentTime = 0;
        destroyChickenSound.play();
        let index = this.world.level.enemies.indexOf(this);
        if (index !== -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }

    /**
     * Handles the impact when the chicken is hit by a bottle.
     * Stops movement and removes the chicken after a short delay.
     */
    handleBottleHit() {
        let deadImagePath = this instanceof Chick
            ? 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
            : 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
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
