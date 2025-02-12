/**
 * Represents the main character of the game.
 * Inherits from MovableObject and includes animations, movement, and physics.
 */
class Character extends MovableObject {
    height = 180;
    width = 90;
    y = 250;
    speed = 7;
    offsetX = 10;
    offsetY = 5;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    world;
    /**
     * Creates a new Character instance and initializes animations and movement.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.setupAnimationHandler();
        this.setupJumpAnimationHandler();
    }

    /**
     * Checks if the character is dead.
     * @returns {boolean} True if energy is 0 or below, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Starts the animation and movement handlers.
     */
    animate() {
        this.setupMovementHandler();
        this.setupAnimationHandler();
    }

    /**
     * Sets up the movement handling interval.
     */
    setupMovementHandler() {
        setInterval(() => {
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);
    }

    /**
     * Handles all movement-related inputs for the character.
     */
    handleMovement() {
        this.handleRightMovement();
        this.handleLeftMovement();
        this.handleJump();
        this.handleWakeUp();
    }

    /**
     * Moves the character to the right if the right key is pressed
     * and the character is within the level bounds.
     */
    handleRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.updateLastKeyPressTime();
        }
    }

    /**
     * Moves the character to the left if the left key is pressed
     * and the character is within the level bounds.
     */
    handleLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.updateLastKeyPressTime();
        }
    }

    /**
     * Makes the character jump if the space key is pressed
     * and the character is on the ground.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.updateLastKeyPressTime();
        }
    }

    /**
     * Wakes up the character if the "D" key is pressed
     * and the character is in the sleeping state.
     */
    handleWakeUp() {
        if (this.world.keyboard.D) {
            if (this.currentImageSet === this.IMAGES_SLEEPING) {
                this.setSpeedInAnimation(this.IMAGES_STANDING, 200);
            }
            this.updateLastKeyPressTime();
        }
    }

    /**
     * Updates the camera position based on character movement.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Updates the last key press time for idle animations.
     */
    updateLastKeyPressTime() {
        this.lastKeyPressTime = Date.now();
    }

    /**
     * Sets up the animation handling interval.
     */
    setupAnimationHandler() {
        setInterval(() => {
            this.handleAnimation();
        }, 50);
    }

    /**
     * Sets up a separate animation handling interval specifically for the jumping animation.
     */
    setupJumpAnimationHandler() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 120);
    }

    /**
     * Controls the character's animations based on state.
     */
    handleAnimation() {
        if (this.isDead()) {
            this.handleDeath();
            return;
        }
        if (this.isHurt() && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (!this.isAboveGround()) { 
            this.handleIdleOrWalking();
        }
    }

    /**
     * Handles the character's death animation and game reset.
     */
    handleDeath() {
        if (this.alreadyReset) return;
        this.alreadyReset = true;
        characdead.currentTime = 0;
        characdead.play();
        stopAllIntervals();
        this.playDeathAnimation();
    }

    /**
     * Plays the character's death animation and triggers game over.
     */
    playDeathAnimation() {
        let deathAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);
        setTimeout(() => {
            characterDies.currentTime = 0;
            characterDies.play();
            clearInterval(deathAnimation);
            showLosingScreen();
            resetGameLose();
        }, 2000);
    }

    /**
     * Determines whether the character should be idle, sleeping, or walking.
     */
    handleIdleOrWalking() {
        let timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.world.keyboard.D && this.currentImageSet === this.IMAGES_SLEEPING) {
            this.setSpeedInAnimation(this.IMAGES_STANDING, 200);
        } else if (timeSinceLastKeyPress >= 5000) {
            this.setSpeedInAnimation(this.IMAGES_SLEEPING, 250);
        } else {
            this.setSpeedInAnimation(this.IMAGES_STANDING, 200);
        }
    }


    /**
     * Plays animations at a controlled speed.
     * @param {string[]} images - The animation array to play.
     * @param {number} interval - The animation speed in milliseconds.
     */
    setSpeedInAnimation(images, interval) {
        if (!this.lastAnimationTime || Date.now() - this.lastAnimationTime >= interval) {
            this.lastAnimationTime = Date.now();
            this.playAnimation(images);
        }
    }

}