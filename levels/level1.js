/**
 * Creates and returns a new level with background objects, clouds, coins, and Tabasco bottles.
 * @returns {Level} A new Level instance.
 */
function createLevel() {
    return new Level(
        [],
        [new Cloud(),
        new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
    
            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle(),
            new TabascoBottle()
        ],
    );
}

/**
 * Sets up the enemies in the level and starts the game.
 * Ensures that enemies are only set once.
 */
function setEnemies() {
    document.getElementById('start-overlay').classList.remove('d-flex');
    document.getElementById('start-overlay').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    if (enemiesSetted) {
        return;
    }
    level1.enemies = [
        new Chicken(),
        new Chick(),
        new Chicken(),
        new Chick(),
        new Chicken(),  
        new Chicken(),
        new Chicken(),
        new BossChicken()
    ];
    enemiesSetted = true;
    world.setWorld(); 
    world.draw();
}

/**
 * Resets and sets enemies after losing the game.
 * Ensures that enemies are only reset if not already set.
 */
function setEnemiesAfterLose() {
    document.getElementById('overlay-losing-screen').classList.remove('d-flex');
    document.getElementById('overlay-losing-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    if (enemiesSetted) {
        return;
    }
    level1.enemies = [
        new Chicken(),
        new Chick(),
        new Chicken(),
        new Chick(),
        new Chicken(),  
        new Chicken(),
        new Chicken(),
        new BossChicken()
    ];
    enemiesSetted = true;
    world.setWorld(); 
    world.draw();
}