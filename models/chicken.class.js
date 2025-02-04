class Chicken extends MovableObject {
    y = 350;
    height = 75;
    width = 100;
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
        this.x = 600 + Math.random() * 1200;
        this.speed = 0.1 + Math.random() * 0.8;
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

    replaceWithDeadEnemy() {
        let deadImagePath = this instanceof Chick
            ? 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
            : 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
        let deadEnemy = new DeadEnemy(this.x, this.y, this.width, this.height, deadImagePath, this.world);
        this.world.level.enemies.push(deadEnemy);
    
        let index = this.world.level.enemies.indexOf(this);
        if (index !== -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }

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
