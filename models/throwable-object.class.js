class ThrowableObject extends MovableObject {
    constructor(x, y, world) {  // ✅ Hier `world` als Parameter akzeptieren
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.world = world; // ✅ Speichert die `world`-Referenz für späteren Zugriff
        this.throw();
        this.trackPosition(); // ✅ Startet das Tracking
    }



    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
        }, 25);
    }

    trackPosition() {
        let trackInterval = setInterval(() => {
            if (!this.world || !this.world.level || this.world.level.enemies.length === 0) {
                console.log("⚠️ Keine Gegner vorhanden oder Welt nicht definiert.");
                clearInterval(trackInterval);
                return;
            }
    
            this.world.level.enemies.forEach((enemy, index) => {
                //console.log(`🚀 Flasche: x=${this.x}, y=${this.y} || 🐔 Gegner ${index + 1}: x=${enemy.x}, y=${enemy.y}`);
                
                this.isBottleCollidingWithEnemy(enemy); // 🔥 Kollision direkt checken
            });
    
            if (this.y > 500 || this.x < 0 || this.x > 4000) { 
                clearInterval(trackInterval);
                console.log("🛑 Tracking gestoppt: Flasche ist aus dem Bildschirm!");
            }
        }, 20);
    }
    
    isBottleCollidingWithEnemy(enemy) {
        let collides =
            this.x + this.width > enemy.x &&  
            this.x < enemy.x + enemy.width &&  
            this.y + this.height > enemy.y &&  
            this.y < enemy.y + enemy.height;  
    
        if (collides) {
            console.log(`🎯 Treffer! Flasche kollidiert mit Gegner!`);
            console.log(`📍 Flasche: x=${this.x}, y=${this.y}, Breite=${this.width}, Höhe=${this.height}`);
            console.log(`🐔 Gegner: x=${enemy.x}, y=${enemy.y}, Breite=${enemy.width}, Höhe=${enemy.height}`);
    
            if (enemy instanceof Chicken || enemy instanceof Chick) {
                enemy.handleBottleHit(); // 💀 Rufe die neue Methode auf!
            }
        } else {
            console.log("❌ Kein Treffer, keine Kollision.");
        }
    
        return collides;
    }
    
    
    
    
    
}
