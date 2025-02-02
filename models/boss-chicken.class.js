class BossChicken extends MovableObject {
    y = 100;
    height = 400;
    width = 250;
    offsetX = 0;
    offsetY = 0;
    waitingAnimationInterval = null; // Speichert das Interval für die Warteanimation
    attackStarted = false; // Verhindert, dass der Angriff mehrmals gestartet wird
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



    removeEnemy() {
        this.deathXCoordinate = this.x;
        console.log(this.deathXCoordinate);
        this.isDead = true; 
        this.isFrozen = true; 
        this.img = null;
        this.imageCache = null;
        clearInterval(this.returnInterval);
        clearInterval(this.walkingAnimation);
        this.deadEndbossAnimation();
    }
    

    deadEndbossAnimation() {
        let deadChicken = new DrawableObject();
        deadChicken.x = this.deathXCoordinate;
        deadChicken.y = this.y;
        deadChicken.width = this.width;
        deadChicken.height = this.height;
        let frameIndex = 0;
        const animateDeadChicken = () => {
            if (frameIndex < this.IMAGES_DEAD.length) {
                deadChicken.img = new Image();
                deadChicken.img.src = this.IMAGES_DEAD[frameIndex];
                frameIndex++;
                setTimeout(animateDeadChicken, 300);
            }
        };
    
        this.world.level.enemies.push(deadChicken);
        animateDeadChicken();
        console.log(`💀 BossChicken stirbt mit Animation an x=${this.deathXCoordinate}`);
    }
    

    moveLeft() {
        if (this.isFrozen || this.isDead) return;
        this.x -= this.speed;
    }
    
    moveRight() {
        if (this.isFrozen || this.isDead) return;
        this.x += this.speed;
    }
    
    playHurtAnimation() {
        if (this.isHurt) return;       
        this.isHurt = true;
        this.isFrozen = true;       
        let frameIndex = 0;
        let hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[frameIndex]];
            frameIndex = (frameIndex + 1) % this.IMAGES_HURT.length;
        }, 100);  
        setTimeout(() => {
            clearInterval(hurtInterval);
            this.isHurt = false;
            this.isFrozen = false;
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000); 
    }
    
    
    setWorld(world) {
        this.world = world;
    }

    animationWaitingBoss() {
        this.waitingAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }


    checkForAttackTrigger() {
        let triggerCheckInterval = setInterval(() => {
            if (this.world && this.world.character.x >= 2000 && !this.attackStarted) {
                this.attackStarted = true;

                clearInterval(this.waitingAnimationInterval);
                clearInterval(triggerCheckInterval);

                console.log("Endboss startet Angriff!");
                this.startAttackCycle();
            }
        }, 100);
    }

    startAttackCycle() {
        console.log("🔥 DEBUG: startAttackCycle() aufgerufen! isDead:", this.isDead);
        if (this.isDead) {
            return;
        }   
        let startX = 2500; 
        let minX = 500; 
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
    
    

    returnToStartPosition(startX) {
        if (this.isDead) return;
        let returnInterval = setInterval(() => {
            if (this.x < startX) {
                this.moveRight();
            } else {
                clearInterval(returnInterval);
                console.log("Boss ist zurück an seiner Position. Angriff beginnt erneut!");
                this.startAttackCycle(); // Startet den Angriff erneut
            }
        }, 1000 / 60);
    }
    
    
    
    animateAttack(callback) {
        if (this.isDead) return;
        let originalSpeed = this.speed;
        this.speed = 12;
        let attackInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(attackInterval);
                return;
            }
            this.moveLeft();
        }, 1000 / 60);
    
        let animationInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(animationInterval);
                return;
            }
            this.playAnimation(this.IMAGES_ATTACKING);
        }, 200);
    
        setTimeout(() => {
            clearInterval(attackInterval);
            clearInterval(animationInterval);
            this.speed = originalSpeed;
            if (this.isDead) {
                return;
            }
            if (callback) callback(); // Starte den Rückweg nur, wenn Boss noch lebt
        }, 800);
    }
    

    moveBackToStart(callback) {
        if (this.isDead) return;
        let targetX = this.x + 60;
        this.startReturning(targetX, callback);
        this.startWalkingBack();
    }
    
    /**
     * Startet die Bewegung zurück zur Ziel-X-Koordinate.
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
    

    stopMovement() {
        if (this.isDead) {
            this.stopReturningMovement();
            return true;
        }
        return false;
    }
    

    stopReturningMovement() {
        clearInterval(this.returnInterval);
    }
    
    decideReturn(callback) {
        if (this.x > 500) {
            callback();
        } else {
            this.returnToStartPosition(2500);
        }
    }
    
    startWalkingBack() {

        let reversedImages = [...this.IMAGES_WALKING].reverse();
        let frameIndex = 0;
    
        this.walkingAnimation = setInterval(() => {
            if (this.stopMovement()) {
                this.stopWalking();
                return;
            }
            this.img = this.imageCache[reversedImages[frameIndex]];
            frameIndex = (frameIndex + 1) % reversedImages.length;
        }, 300);

    }
        //setTimeout(() => this.stopWalking(), Math.abs(this.x - this.deathXCoordinate) / this.speed * 60);

    

    stopWalking() {
        clearInterval(this.walkingAnimation);
    }
    
    
    
    


}
