/**
 * Represents the Boss Chicken enemy in the game.
 * Inherits from MovableObject and has multiple animations and attack behaviors.
 */
class BossChicken extends MovableObject {
    y = 100;
    height = 400;
    width = 250;
    offsetX = 0;
    offsetY = 0;
    waitingAnimationInterval = null;
    attackStarted = false; 
    isHurt = false;
    hasBeenHit = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'   
    ];

    /**
     * Initializes the Boss Chicken with animations and movement behavior.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.isDead = false; 
        this.isFrozen = false; 
    
        this.animationWaitingBoss();
        this.checkForAttackTrigger(); 
    }


    /**
     * Marks the boss as dead, stops movement, and starts the death animation.
     */
    removeEnemy() {
        this.deathXCoordinate = this.x;
        this.isDead = true; 
        this.isFrozen = true; 
        this.img = null;
        this.imageCache = null;
        stopAllIntervalsExceptEndbossDeath();
        this.deadEndbossAnimation();
    }
    
    /**
     * Plays the boss's death animation.
     */
    deadEndbossAnimation() {
        deathboss.currentTime = 0;
        deathboss.play();
        let deadChicken = new DrawableObject();
        deadChicken.x = this.deathXCoordinate;
        deadChicken.y = this.y;
        deadChicken.width = this.width;
        deadChicken.height = this.height;
        let imgIndex = 0;
        const animateDeadChicken = () => {
            if (imgIndex < this.IMAGES_DEAD.length) {
                deadChicken.img = new Image();
                deadChicken.img.src = this.IMAGES_DEAD[imgIndex];
                imgIndex++;
                setTimeout(animateDeadChicken, 300);
            }
        };
        this.world.level.enemies.push(deadChicken);
        animateDeadChicken();
        showWinningScreen();

    }
    
    /**
     * Moves the boss to the left unless it is frozen or dead.
     */    
    moveLeft() {
        if (this.isFrozen || this.isDead) return;
        this.x -= this.speed;
    }

    /**
     * Moves the boss to the right unless it is frozen or dead.
     */    
    moveRight() {
        if (this.isFrozen || this.isDead) return;
        this.x += this.speed;
    }

    /**
     * Plays the hurt animation and temporarily freezes the boss-chicken.
     */
    playHurtAnimation() {
        if (this.isHurt) return;       
        this.isHurt = true;
        this.isFrozen = true;
        let imgIndex = 0;
        deathboss.currentTime = 0;
        deathboss.play();
        let hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[imgIndex]];
            imgIndex = (imgIndex + 1) % this.IMAGES_HURT.length;
        }, 100);      
        setTimeout(() => {
            clearInterval(hurtInterval);
            this.isHurt = false;
            this.isFrozen = false;
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000); 
    }
    
    
    
    /**
     * Sets the game world reference for the boss.
     * @param {Object} world - The game world.
     */    
    setWorld(world) {
        this.world = world;
    }

    /**
     * Starts the boss's waiting animation loop.
     */
    animationWaitingBoss() {
        this.waitingAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }

    /**
     * Checks if the player has reached a certain position to trigger the boss attack.
     */
    checkForAttackTrigger() {
        let triggerCheckInterval = setInterval(() => {
            if (this.world && this.world.character.x >= 2000 && !this.attackStarted) {
                this.attackStarted = true;
                clearInterval(this.waitingAnimationInterval);
                clearInterval(triggerCheckInterval);
                this.startAttackCycle();
            }
        }, 100);
    }

    /**
     * Starts the boss chickenss attack cycle.
     */    
    startAttackCycle() {
        if (this.isDead) {
            return;
        }   
        let startX = 2500; 
        let minX = 1000; 
        const attackLoop = () => {
            if (this.isDead) {
                return;
            }
            if (this.x > minX) { 
                this.animateAttack(() => {
                    this.moveBackToStart(attackLoop);
                });
            } else {
                this.returnToStartPosition(startX);
            }
        };
        attackLoop();
    }
    
    
    /**
     * Moves the boss back to its starting position.
     * @param {number} startX - The starting X position.
     */
    returnToStartPosition(startX) {
        if (this.isDead) return;
        let returnInterval = setInterval(() => {
            if (this.x < startX) {
                this.moveRight();
            } else {
                clearInterval(returnInterval);
                this.startAttackCycle();
            }
        }, 1000 / 60);
    }
    

/**
 * Starts the attack animation and movement.
 * @param {Function} callback - Function to execute after the attack.
 */
animateAttack(callback) {
    if (this.isDead) return;
    let originalSpeed = this.speed;
    this.speed = 9;

    let attackInterval = this.startAttackMovement();
    let animationInterval = this.startAttackAnimation();

    this.stopAttackAfterDelay(attackInterval, animationInterval, originalSpeed, callback);
}

/**
 * Moves the boss to the left while attacking.
 * @returns {number} The interval ID for movement control.
 */
startAttackMovement() {
    return setInterval(() => {
        if (this.isDead) return clearInterval(this.attackInterval);
        this.moveLeft();
    }, 1000 / 60);
}

/**
 * Plays the attack animation.
 * @returns {number} The interval ID for animation control.
 */
startAttackAnimation() {
    return setInterval(() => {
        if (this.isDead) return clearInterval(this.animationInterval);
        this.playAnimation(this.IMAGES_ATTACKING);
    }, 200);
}

/**
 * Stops the attack movement and animation after a delay.
 * @param {number} attackInterval - The movement interval ID.
 * @param {number} animationInterval - The animation interval ID.
 * @param {number} originalSpeed - The original speed before attack.
 * @param {Function} callback - Function to execute after attack ends.
 */
stopAttackAfterDelay(attackInterval, animationInterval, originalSpeed, callback) {
    setTimeout(() => {
        clearInterval(attackInterval);
        clearInterval(animationInterval);
        this.speed = originalSpeed;
        if (!this.isDead && callback) callback();
    }, 800);
}

/**
* Moves the boss back slightly after an attack.
* @param {Function} callback - Function to execute after moving back.
*/
moveBackToStart(callback) {
    if (this.isDead) return;
    let targetX = this.x + 60;
    this.startReturning(targetX, callback);
    this.startWalkingBack();
}
    
/**
 * Moves the boss back to a specific position.
 * @param {number} targetX - The X coordinate to return to.
 * @param {Function} callback - Function to execute after reaching the position.
 */
startReturning(targetX, callback) {
    this.returnInterval = setInterval(() => {
        if (this.stopMovement()) return;
        if (this.x < targetX) {
            this.moveRight();
        } else {
            this.stopReturningMovement();
            this.decideReturn(callback);
        }
    }, 1000 / 60);
}

/**
 * Determines whether the boss should continue returning or attack again.
 * @param {Function} callback - Function to execute next.
 */
decideReturn(callback) {
    if (this.x > 500) {
        callback();
    } else {
        this.returnToStartPosition(2500);
    }
}
    
/**
 * Stops all movement if the boss is dead.
 * @returns {boolean} True if movement should stop.
 */
stopMovement() {
    if (this.isDead) {
        this.stopReturningMovement();
        return true;
    }
    return false;
}
    
/**
 * Stops the boss's returning movement.
 */
stopReturningMovement() {
    clearInterval(this.returnInterval);
}

/**
* Starts the walking-back animation by playing the reversed walking images.
* The animation loops through the reversed images every 300ms.
*/
startWalkingBack() {
    let reversedImages = [...this.IMAGES_WALKING].reverse();
    let imgIndex = 0;   
    this.walkingAnimation = setInterval(() => {
        if (this.stopMovement()) {
            this.stopWalking();
            return;
        }
        this.img = this.imageCache[reversedImages[imgIndex]];
        imgIndex = (imgIndex + 1) % reversedImages.length;
    }, 300);
}

/**
* Stops the walking animation by clearing the interval.
*/
stopWalking() {
    clearInterval(this.walkingAnimation);
}

    
    
    
}
