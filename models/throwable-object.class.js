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

    trackPosition() {
        const checkCollision = () => {
            if (!this.world || !this.world.level || this.world.level.enemies.length === 0) {
                console.log("⚠️ Keine Gegner vorhanden oder Welt nicht definiert.");
                return;
            }
    
            this.world.level.enemies.forEach((enemy, index) => { 
                //console.log(`🚀 Flasche: x=${this.x}, y=${this.y} || 🐔 Gegner ${index + 1}: x=${enemy.x}, y=${enemy.y}`);
    
                if (this.isCollidingWithEnemy(enemy) && !enemy.hasBeenHit) { // 👈 NEU: Verhindert Mehrfach-Treffer
                    enemy.hasBeenHit = true; // ❗ Boss wurde getroffen, keine weiteren Hits registrieren
    
                    if (enemy instanceof BossChicken) {
                        console.log("🔥 Treffer auf BossChicken!");
    
                        // 🩸 **Verringere Boss-HP um 20**
                        this.world.statusBarEndboss.reduceHealth(20);
    
                        console.log(`🔴 Boss HP nach Treffer: ${this.world.statusBarEndboss.percentageEndboss}%`);
    
                        // 🛑 **Ist der Boss jetzt tot?**
                        if (this.world.statusBarEndboss.percentageEndboss <= 0) {
                            console.log("💀 BossChicken ist besiegt!");
                            enemy.playDeathAnimation(); // 💀 Todesanimation
                        } else {
                            console.log("💢 BossChicken verletzt!");
                            enemy.playHurtAnimation(); // 💢 Hurt-Animation
                        }
    
                        // 🕒 **Nach 1 Sekunde kann Boss erneut getroffen werden**
                        setTimeout(() => {
                            enemy.hasBeenHit = false;
                        }, 1000); // 🔄 Boss kann erst nach 1 Sekunde wieder getroffen werden
                    } else {
                        console.log(`💥 Treffer! Flasche kollidiert mit ${enemy.constructor.name} an x=${this.x}, y=${this.y}`);
                        this.stopRotation();
                        enemy.replaceWithDeadEnemy();
                    }
    
                    this.removeBottle();
                    return; // 💡 Beende die Funktion, wenn ein Treffer erkannt wurde
                }
            });
    
            // ❌ Falls die Flasche aus dem Bildschirm fliegt → Entfernen
            if (this.y > 500 || this.x < 0) {
                console.log("🛑 Tracking gestoppt: Flasche ist aus dem Bildschirm!");
                this.removeBottle();
                return;
            }
    
            // 🔄 Wiederhole Kollisionsprüfung im nächsten Frame
            requestAnimationFrame(checkCollision);
        };
    
        requestAnimationFrame(checkCollision);
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

/** 🔍 **Verbesserte Kollision zwischen Flasche & Gegner (präzisere Berechnung)** */
isCollidingWithEnemy(enemy) {
    // 🎯 Mittelpunkt der Flasche berechnen
    let bottleCenterX = this.x + this.width / 2;
    let bottleCenterY = this.y + this.height / 2;

    // 🎯 Mittelpunkt des Gegners berechnen
    let enemyCenterX = enemy.x + enemy.width / 2;
    let enemyCenterY = enemy.y + enemy.height / 2;

    // 📏 Berechne die Differenz der Mittelpunkte
    let dx = Math.abs(bottleCenterX - enemyCenterX);
    let dy = Math.abs(bottleCenterY - enemyCenterY);

    // 🛑 Wenn die Differenz kleiner als die Hälfte der Breiten & Höhen ist → Treffer!
    let collision = (dx < (this.width / 2 + enemy.width / 2)) &&
                    (dy < (this.height / 2 + enemy.height / 2));

                    //console.log(`🔍 Kollisionsprüfung: ${collision ? "✔️ Treffer!" : "❌ Kein Treffer"}`);
    return collision;
}
}
