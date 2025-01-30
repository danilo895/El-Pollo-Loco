class BossChicken extends MovableObject {
    y = 100;
    height = 400;
    width = 250;
    offsetX = 0;
    offsetY = 0;

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

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 2000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.startAttackCycle(); // Neuer Zyklus für Angriff und Rücklauf starten
    }

    setWorld(world) {
        this.world = world;
    }

    startAttackCycle() {
        let startX = this.x; // Ursprungsposition merken

        const attackLoop = () => {
            this.animateAttack(() => {
                this.moveBackToStart(startX, attackLoop); // Starte den Rückweg, dann wiederhole Angriff
            });
        };

        attackLoop(); // Erster Angriff starten
    }

    animateAttack(callback) {
        let originalSpeed = this.speed; 
        this.speed = 12; 
        let attackInterval = setInterval(() => this.moveLeft(), 1000 / 60);
        let animationInterval = setInterval(() => this.playAnimation(this.IMAGES_ATTACKING), 200);

        setTimeout(() => {
            clearInterval(attackInterval);
            clearInterval(animationInterval);
            this.speed = originalSpeed;
            if (callback) callback(); // Starte den Rückweg, falls Callback vorhanden
        }, 800);
    }

    moveBackToStart(startX, callback) {
        let returnInterval = setInterval(() => {
            if (this.x < startX) {
                this.moveRight();
            } else {
                clearInterval(returnInterval);
                if (callback) callback(); // Starte neuen Angriff
            }
        }, 1000 / 60);
    
        // Rückwärtslauf-Animation langsamer abspielen (300ms statt 200ms)
        let reversedImages = [...this.IMAGES_WALKING].reverse();
        let frameIndex = 0;
    
        let walkingAnimation = setInterval(() => {
            this.img = this.imageCache[reversedImages[frameIndex]];
            frameIndex = (frameIndex + 1) % reversedImages.length; // Nächstes Bild
        }, 300); // Langsamer als normales Laufen
    
        setTimeout(() => clearInterval(walkingAnimation), Math.abs(this.x - startX) / this.speed * 60);
    }
}
