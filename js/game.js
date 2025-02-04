let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


window.addEventListener("keydown",(e) =>{
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }
});


window.addEventListener("keyup",(e) =>{
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;
    }
});


function backToMainMenu(){
    document.getElementById('overlay-winning-screen').classList.remove('d-flex');
    document.getElementById('overlay-winning-screen').classList.add('d-none');
    document.getElementById('overlay-start-game').classList.remove('d-none');  
}

function backToMainMenuAfterLose(){
    document.getElementById('overlay-losing-screen').classList.remove('d-flex');
    document.getElementById('overlay-losing-screen').classList.add('d-none');
    document.getElementById('overlay-start-game').classList.remove('d-none');
}


function startGameAgain(){
    document.getElementById('overlay-winning-screen').classList.remove('d-flex');
    document.getElementById('overlay-winning-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    if (enemiesSetted) {
        return;
    }
    level1.enemies = [
        new Chicken(),
        new Chick(),
        new BossChicken()
    ];
    enemiesSetted = true;
    world.setWorld(); 
    world.draw();
}

function initLevel() {
    return new Level(
        [
        ],
        [
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
        ],
    ); 
}


function showWinningScreen() {
    setTimeout(() => {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('overlay-winning-screen').classList.remove('d-none');
        document.getElementById('overlay-winning-screen').classList.add('d-flex');
    }, 1400);
    resetGame();
}


function resetGame() {
    setTimeout(() => {
        world = null;
        level1 = initLevel();
        enemiesSetted = false;
        init();
    }, 1400);
}

function showLosingScreen() {
    setTimeout(() => {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('overlay-losing-screen').classList.remove('d-none');
        document.getElementById('overlay-losing-screen').classList.add('d-flex');
    }, 1400);
}


function resetGameAfterLose() {
    setTimeout(() => {
        world = null;
        level1 = null;
        enemiesSetted = false; 
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            restartGameAfterLose();
        }, 1000);
    }, 150);
}

function restartGameAfterLose() {
    level1 = initLevel();
    enemiesSetted = false; 
    world = new World(document.getElementById("canvas"), keyboard);
    requestAnimationFrame(() => world.draw());
}







