/**
 * Represents a cloud in the background of the game.
 * Inherits from MovableObject and moves continuously to the left.
 */
class Cloud extends MovableObject{
    y = 20;
    height = 250;
    width = 500;
    

    /**
     * Creates a new Cloud instance with a random X position.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }
    
    /**
     * Starts the cloud's movement animation, making it move left continuously.
     */
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
    
}

