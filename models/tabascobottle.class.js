class TabascoBottle extends DrawableObject{
y = 300;
x = 250;
offsetX = 0;
offsetY = 0;
IMAGES_TABASCOBOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];
currentImage = 0;

constructor(){
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = 100 + Math.random() * (1600 - 100);
    this.y = 220 + Math.random() * (350 - 220);
    this.animate();
}

animate() {
    setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.IMAGES_TABASCOBOTTLE.length; 
        this.loadImage(this.IMAGES_TABASCOBOTTLE[this.currentImage]);
        if (this.currentImage === 1) {
            this.width = 96;
            this.height = 96;
        } else {
            this.width = 96;
            this.height = 96;
        }

    }, 300); 
}

}