class World{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lastHit=0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollision();
            this.checkThrowObjects();
        }, 200);
    }
    

checkThrowObjects(){
    if(this.keyboard.D){
        let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }
    }

checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
            this.level.coins.splice(index, 1);
            this.statusBarCoin.setPercentage(this.statusBarCoin.percentageCoin + 20); // StatusBar aktualisieren
        }
    });
}


    checkCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if( this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
    })
};


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);


        
        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function(){
            self.draw()
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        });
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if(mo.otherDirection){
        this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width,0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    
}