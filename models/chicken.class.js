class Chicken extends MovableObject {
    y = 370;
    height = 70;
    width = 120;
    offsetX = 0;
    offsetY = 0;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 600 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }
    setWorld(world) {
        this.world = world;
    }
    

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    deleteAliveImg() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png'); // Totes Chicken anzeigen
        this.speed = 0; // Bewegung stoppen
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this); 
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1); // Entferne Chicken nach 1 Sekunde
            }
        }, 10);
    }
    
}
