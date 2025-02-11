/**
 * Represents a collectible Tabasco bottle in the game.
 * Inherits from DrawableObject and includes an animation effect.
 */
class TabascoBottle extends DrawableObject{
y = 350;
x = 250;
width = 75;
height = 105;
offsetX = 30;
offsetY = 10;
IMAGES_TABASCOBOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];
currentImage = 0;

/**
* Creates a new TabascoBottle instance with a random X position.
*/
constructor(){
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = 300 + Math.random() * (1600 - 100); 
    this.animate();
}

/**
* Animates the Tabasco bottle by switching between images to create a flickering effect.
*/
animate() {
    setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.IMAGES_TABASCOBOTTLE.length; 
        this.loadImage(this.IMAGES_TABASCOBOTTLE[this.currentImage]);
    }, 500); 
}

}