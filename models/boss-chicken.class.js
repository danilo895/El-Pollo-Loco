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
        this.x = 600;
        this.speed = 0.15 + Math.random() * 0.5;
        //this.animateWalking();
        //this.animateAlert();
        this.animateAttack();
    }
    setWorld(world) {
        this.world = world;
    }
    

    animateWalking(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
    },200);
    }

    animateAlert(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_ALERT);
    },200);
    }

    animateAttack() {
        let originalSpeed = this.speed; // Originalgeschwindigkeit speichern
        this.speed = 12; // Geschwindigkeit für den Angriff erhöhen
        let startX = this.x; // Ursprungsposition speichern
    
        let attackInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    
        let animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACKING);
        }, 200);
    
        // Nach 800ms normale Geschwindigkeit & Richtung wechseln
        setTimeout(() => {
            clearInterval(attackInterval); // Stoppt den Angriff nach 800ms
            clearInterval(animationInterval); // Stoppt die Angriffsanimation
            this.speed = originalSpeed;
            this.moveBackToStart(startX);
        }, 800);
    }
    
    
    moveBackToStart(startX) {
        let returnInterval = setInterval(() => {
            if (this.x < startX) {
                this.moveRight(); // Bewege BossChicken nach rechts
            } else {
                clearInterval(returnInterval); // Stoppe Bewegung, wenn Startpunkt erreicht
                this.animateWalking(); // Nach dem Rückweg wieder normale Bewegung
            }
        }, 1000 / 60);
    
        // Animation langsamer abspielen (alle 200ms, wie normale Laufanimation)
        let animationInterval = setInterval(() => {
            this.playAnimation([...this.IMAGES_WALKING].reverse()); // Rückwärtslauf
        }, 200); // Langsamer abspielen
    
        // Animation stoppen, wenn Bewegung vorbei ist
        setTimeout(() => {
            clearInterval(animationInterval);
        }, Math.abs(this.x - startX) / this.speed * 60); // Berechnet ungefähre Laufzeit
    }
    
    
    
    
    



    
}

