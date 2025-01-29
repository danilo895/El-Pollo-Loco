class Chick extends MovableObject {
    y = 390;
    height = 50;
    width = 80;
    offsetX = 0;
    offsetY = 0;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 700;
        this.speed = 0.2 + Math.random() * 0.2;
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
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png'); // Bild für toten Chick
        this.speed = 0; // Bewegung stoppen
        
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1); // Entferne Chick nach 1 Sekunde
            }
        }, 10);
    }
}
