class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    tabascoBottles;
    level_end_x = 2240;


    constructor(enemies, clouds, backgroundObjects, coins, tabascoBottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.tabascoBottles = tabascoBottles;

    }
}