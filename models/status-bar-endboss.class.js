class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png', // 100%
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',  // 80%
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',  // 60%
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',  // 40%
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',  // 20%
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png'    // 0%
    ];
    percentageEndboss = 100; 

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.img = this.imageCache[this.IMAGES[0]]; // Zeigt das Bild für 100%
    }

    /** 🔻 Verringert die Lebensanzeige des Endbosses SCHRITTWEISE */
    reduceHealth(amount) {
        if (this.percentageEndboss > 0) {
            this.percentageEndboss -= amount; // ⬇️ Reduziere Lebenspunkte
        }
        
        if (this.percentageEndboss < 0) {
            this.percentageEndboss = 0; // 💀 Mindestwert: 0%
        }
        
        console.log(`📉 Boss HP: ${this.percentageEndboss}%`); // Debug-Log zur Überprüfung

        let imageIndex = this.getHealthImageIndex();
        this.img = this.imageCache[this.IMAGES[imageIndex]]; // 🖼 Aktualisiert Bild
    }

    /** 🔄 Bestimmt, welches Bild in der Statusleiste angezeigt wird */
    getHealthImageIndex() {
        if (this.percentageEndboss > 80) return 0;
        if (this.percentageEndboss > 60) return 1;
        if (this.percentageEndboss > 40) return 2;
        if (this.percentageEndboss > 20) return 3;
        if (this.percentageEndboss > 0) return 4;
        return 5; // 🔚 0% (Boss ist besiegt)
    }
}
