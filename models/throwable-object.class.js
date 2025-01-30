class ThrowableObject extends MovableObject {
    rotationAngle = 0; // 🌀 Startwinkel für die Drehung

    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.world = world;
        this.throw();
        this.startRotation(); // 🌀 Startet die Drehung
        this.trackPosition(); // 📍 Startet das Tracking der Position & Kollisionen
    }

    /** 🚀 **Flasche werfen (nach rechts oder links) mit Schwerkraft** */
    throw() {
        this.speedY = 30; 
        this.applyGravity();
        
        let direction = this.world.character.otherDirection ? -1 : 1; // ➡️ Richtung der Flasche

        this.throwInterval = setInterval(() => {
            this.x += 10 * direction;

            // ❌ Flasche entfernen, wenn sie den Bildschirm verlässt
            if (this.y > 500 || this.x < 0) {
                this.removeBottle();
            }
        }, 25);
    }

    /** 🌀 **Startet die Rotation** */
    startRotation() {
        this.rotationInterval = setInterval(() => {
            this.rotationAngle += 10; // Rotiert um 10° pro Frame
            if (this.rotationAngle >= 360) {
                this.rotationAngle = 0; // Setzt zurück auf 0 nach einer vollen Drehung
            }
        }, 50);
    }

    /** 🛑 **Stoppt die Rotation (wenn Flasche getroffen hat)** */
    stopRotation() {
        clearInterval(this.rotationInterval);
    }

    /** 📍 **Flaschenbewegung & Kollision mit Gegner tracken** */
    trackPosition() {
        let trackInterval = setInterval(() => {
            if (!this.world || !this.world.level || this.world.level.enemies.length === 0) {
                console.log("⚠️ Keine Gegner vorhanden oder Welt nicht definiert.");
                clearInterval(trackInterval);
                return;
            }

            let enemy = this.world.level.enemies[0]; // 🐔 Erster Gegner (Chicken)
            console.log(`🚀 Flasche: x=${this.x}, y=${this.y} || 🐔 Gegner: x=${enemy.x}, y=${enemy.y}`);

            if (this.isCollidingWithEnemy(enemy)) {
                console.log(`💥 Treffer! Flasche kollidiert mit ${enemy.constructor.name} an x=${this.x}, y=${this.y}`);
                
                this.stopRotation(); // 🛑 Drehung stoppen
                enemy.replaceWithDeadEnemy(); // 💀 Gegner entfernen
                this.removeBottle(); // ❌ Flasche entfernen
                
                clearInterval(trackInterval); // ❌ Tracking beenden
            }

            // ❌ Tracking stoppen, wenn die Flasche außerhalb des Screens ist
            if (this.y > 500 || this.x < 0 || this.x > this.world.canvas.width) {
                console.log("🛑 Tracking gestoppt: Flasche ist aus dem Bildschirm!");
                clearInterval(trackInterval);
            }
        }, 20);
    }

    /** 🔄 **Rotation im Canvas umsetzen** */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Zentrum setzen
        ctx.rotate(this.rotationAngle * Math.PI / 180); // Rotiert die Flasche
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
        super.draw(ctx); // Zeichnet das Bild mit Rotation
        ctx.restore();
    }

    /** ❌ **Flasche aus der Welt entfernen** */
    removeBottle() {
        clearInterval(this.throwInterval); // 🛑 Bewegung stoppen
        clearInterval(this.rotationInterval); // 🛑 Rotation stoppen
        
        let index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) {
            this.world.throwableObjects.splice(index, 1); // ❌ Flasche aus der Welt entfernen
        }
        console.log("🗑 Flasche entfernt.");
    }

    /** 🔍 **Prüft die Kollision zwischen Flasche & Gegner (genauere Berechnung)** */
    isCollidingWithEnemy(enemy) {
        let collision = (
            this.x + this.width > enemy.x &&  // Rechte Kante der Flasche > Linke Kante des Gegners
            this.x < enemy.x + enemy.width && // Linke Kante der Flasche < Rechte Kante des Gegners
            this.y + this.height > enemy.y && // Untere Kante der Flasche > Obere Kante des Gegners
            this.y < enemy.y + enemy.height   // Obere Kante der Flasche < Untere Kante des Gegners
        );
        console.log(`🔍 Kollisionsprüfung: ${collision ? "✔️ Treffer!" : "❌ Kein Treffer"}`);
        return collision;
    }
}
