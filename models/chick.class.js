class Chick extends MovableObject {
    y = 390;
    height = 30;
    width = 50;
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

    replaceWithDeadEnemy() {
        let deadImagePath = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

        let deadEnemy = new DeadEnemy(this.x, this.y, this.width, this.height, deadImagePath, this.world);
        this.world.level.enemies.push(deadEnemy); // Füge das tote Objekt in die Gegnerliste ein

        let index = this.world.level.enemies.indexOf(this);
        if (index !== -1) {
            this.world.level.enemies.splice(index, 1); // Entferne das lebende Küken
        }
    }

    /** 🆕 **NEU: Funktion für Flaschen-Treffer** */
    handleBottleHit() {
        console.log("💀 Küken wurde von einer Flasche getroffen!");

        let deadImagePath = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        this.loadImage(deadImagePath); // Lade das tote Küken-Bild
        this.speed = 0; // Stoppe die Bewegung

        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1); // ❌ Entferne das Küken aus der Gegnerliste
                console.log("❌ Küken endgültig entfernt!");
            }
        }, 500); // Entferne nach 500ms
    }
}
