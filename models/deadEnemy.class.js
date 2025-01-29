class DeadEnemy extends DrawableObject {
    constructor(x, y, width, height, imagePath, world) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y + 10; // Lässt das tote Bild minimal tiefer fallen
        this.width = width;
        this.height = height;
        this.world = world;

        this.scheduleRemoval(); // Entfernt das tote Bild nach einer kurzen Zeit
    }

    scheduleRemoval() {
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1); // Entfernt das tote Chicken nach 2 Sekunden
            }
        }, 2000);
    }
}
