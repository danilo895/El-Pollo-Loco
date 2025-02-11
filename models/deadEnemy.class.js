/**
 * Represents a defeated enemy that remains on the screen for a short time before disappearing.
 * Inherits from DrawableObject.
 */
class DeadEnemy extends DrawableObject {
    constructor(x, y, width, height, imagePath, world) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y + 20;
        this.width = width;
        this.height = height;
        this.world = world;

        this.removeAliveEnemy(); 
    }

    /**
     * Removes the dead enemy from the game world after a short delay.
     */
    removeAliveEnemy() {
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 2000);
    }
}
