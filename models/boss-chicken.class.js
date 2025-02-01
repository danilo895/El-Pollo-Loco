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

    playDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD); 
    }
    
    
    
    

    moveLeft() {
        if (this.isFrozen || this.isDead) return; // Keine Bewegung nach Tod
        this.x -= this.speed;
    }
    
    moveRight() {
        if (this.isFrozen || this.isDead) return; // Keine Bewegung nach Tod
        this.x += this.speed;
    }
    

    
    playHurtAnimation() {
        if (this.isHurt) return; // Falls die Animation bereits läuft, abbrechen
        
        this.isHurt = true; // Setzt den Zustand "ist verletzt"
        this.isFrozen = true; // Stoppt alle Bewegungen
        
        let frameIndex = 0;
        let hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[frameIndex]];
            frameIndex = (frameIndex + 1) % this.IMAGES_HURT.length;
        }, 100);
    
        setTimeout(() => {
            clearInterval(hurtInterval); // Stoppt die Hurt-Animation
            this.isHurt = false;
            this.isFrozen = false; // Boss kann sich wieder bewegen
            this.playAnimation(this.IMAGES_WALKING); // Kehre zur normalen Bewegung zurück
        }, 1000); // ⏳ Hurt-Animation dauert 2,5 Sekunden
    }
    
    
    setWorld(world) {
        this.world = world;
    }

    /**  Startet die Warteanimation */
    animationWaitingBoss() {
        this.waitingAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }

    /**  Prüft regelmäßig, ob der Charakter bei x = 2000 ist */
    checkForAttackTrigger() {
        let triggerCheckInterval = setInterval(() => {
            if (this.world && this.world.character.x >= 2000 && !this.attackStarted) {
                this.attackStarted = true; // Verhindert mehrfachen Start

                clearInterval(this.waitingAnimationInterval); // Stoppe Warteanimation
                clearInterval(triggerCheckInterval); // Stoppe weitere Prüfungen

                console.log("Endboss startet Angriff!");
                this.startAttackCycle(); // Angriff beginnt
            }
        }, 100); // Prüft alle 100ms
    }

    startAttackCycle() {
        console.log("🔥 DEBUG: startAttackCycle() aufgerufen! isDead:", this.isDead);
    
        if (this.isDead) {
            return; // Falls der Boss tot ist, sollte der Angriff NICHT gestartet werden!
        }
    
        let startX = 2500; 
        let minX = 500; 
    
        const attackLoop = () => {
            if (this.isDead) {
                
                return; // Falls der Boss stirbt, wird der Angriff abgebrochen
            }
    
            if (this.x > minX) { 
                this.animateAttack(() => {
                    this.moveBackToStart(attackLoop);
                });
            } else {
                console.log("Boss hat die linke Grenze erreicht! Kehrt zurück zur Startposition.");
                this.returnToStartPosition(startX);
            }
        };
    
        attackLoop();
    }
    
    

    returnToStartPosition(startX) {
        console.log("🔄 DEBUG: returnToStartPosition() aufgerufen! isDead:", this.isDead);
    
        if (this.isDead) {
            console.log("❌ Boss ist tot! Rückkehr zur Startposition wird abgebrochen.");
            return; // Falls der Boss tot ist, sollte er NICHT zurücklaufen!
        }
    
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
        console.log("⚔️ DEBUG: animateAttack() gestartet! isDead:", this.isDead);
    
        if (this.isDead) {
            console.log("❌ Boss ist tot! Angriff wird abgebrochen.");
            return;
        }
    
        let originalSpeed = this.speed;
        this.speed = 12;
        let attackInterval = setInterval(() => {
            if (this.isDead) {
                console.log("❌ Boss ist tot! Attack-Animation wird gestoppt.");
                clearInterval(attackInterval);
                return;
            }
            this.moveLeft();
        }, 1000 / 60);
    
        let animationInterval = setInterval(() => {
            if (this.isDead) {
                console.log("❌ Boss ist tot! Attack-Animation wird gestoppt.");
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
                console.log("❌ Boss ist tot! Rückweg wird abgebrochen.");
                return;
            }
            if (callback) callback(); // Starte den Rückweg nur, wenn Boss noch lebt
        }, 800);
    }
    

    moveBackToStart(callback) {
        let targetX = this.x + 60; //Bewege den Boss 30 Pixel zurück nach rechts
    
        let returnInterval = setInterval(() => {
            if (this.x < targetX) {
                this.moveRight();
            } else {
                clearInterval(returnInterval);
    
                // Falls die linke Grenze `minX` nicht erreicht wurde → neuen Angriff starten
                if (this.x > 500) {
                    callback(); // Greife erneut an
                } else {
                    console.log("Boss hat die linke Grenze erreicht! Kehrt zurück zur Startposition.");
                    this.returnToStartPosition(2500); //Boss läuft zurück
                }
            }
        }, 1000 / 60);
    
        let reversedImages = [...this.IMAGES_WALKING].reverse();
        let frameIndex = 0;
    
        let walkingAnimation = setInterval(() => {
            this.img = this.imageCache[reversedImages[frameIndex]];
            frameIndex = (frameIndex + 1) % reversedImages.length;
        }, 300);
    
        setTimeout(() => clearInterval(walkingAnimation), Math.abs(this.x - targetX) / this.speed * 60);
    }
    
    


    
    
}
