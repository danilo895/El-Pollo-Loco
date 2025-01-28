class TabascoBottle extends DrawableObject{
y = 330;
x = 250;
width = 75;
height = 105;
offsetX = 0;
offsetY = 0;
IMAGES_TABASCOBOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];
currentImage = 0;

constructor(){
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = 150 + Math.random() * (1600 - 100); 
    this.animate();
}

animate() {
    setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.IMAGES_TABASCOBOTTLE.length; 
        this.loadImage(this.IMAGES_TABASCOBOTTLE[this.currentImage]);
    }, 300); 
}

}