class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.throw();
        this.trackPosition(); // ✅ Starte das Tracking der Position
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    trackPosition() {
        let trackInterval = setInterval(() => {
            console.log(`🚀 Flasche Position: x=${this.x}, y=${this.y}`);

            // ❌ Stoppe das Tracking, wenn die Flasche den Bildschirm verlässt
            if (this.y > 500 || this.x < 0 || this.x > 4000) { 
                clearInterval(trackInterval);
                console.log("🛑 Tracking gestoppt: Flasche ist aus dem Bildschirm!");
            }
        }, 20); // ✅ Alle 20ms wird die Position geloggt
    }
}
