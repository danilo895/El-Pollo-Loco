let canvas;
let world;
let moveLeftInterval, moveRightInterval;
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
    document.getElementById('win-overlay').classList.remove('d-flex');
    document.getElementById('win-overlay').classList.add('d-none');
    resetGameFully();
}

function backToMainMenuAfterLose(){
    document.getElementById('lose-overlay').classList.remove('d-flex');
    document.getElementById('lose-overlay').classList.add('d-none');
    document.getElementById('start-overlay').classList.remove('d-none');
    resetGameFully();
}

function resetGameFully() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start-overlay').classList.remove('d-none');
    world = null;
    level1.enemies = [];
    level1.coins = [];
    level1.tabascoBottles = [];
    enemiesSetted = false;
    level1 = initLevel();
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
}


function resetGameLose() {
    world = null;
    level1.enemies = [];
    level1.coins = [];
    level1.tabascoBottles = [];
    enemiesSetted = false;
    level1 = initLevel();
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();

}




function startGameAgain() {
    document.getElementById('win-overlay').classList.remove('d-flex');
    document.getElementById('win-overlay').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    setEnemiesForRetry();
}


function setEnemiesForRetry() {
    if (enemiesSetted) {
        return;
    }
    level1.enemies = [
        new Chicken(),
        new Chick(),
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
        document.getElementById('win-overlay').classList.remove('d-none');
        document.getElementById('win-overlay').classList.add('d-flex');
        winSound.currentTime = 0;
        winSound.play();
    }, 1400);
    
    resetGame();
}

function resetGame() {
    setTimeout(() => {
        world = null;
        level1.enemies = [];
        enemiesSetted = false;
        level1 = initLevel();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        init();
    }, 1500);
}



function showLosingScreen() {
    losesound.currentTime = 0;
    losesound.play();
    if (world && world.character && !world.character.isDead()) {
        return;
    }
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('lose-overlay').classList.remove('d-none');
        document.getElementById('lose-overlay').classList.add('d-flex');
}





function resetGameAfterLose() {
    if (world && world.character && !world.character.isDead()) {
        return;
    }
    world = null;
    level1 = initLevel();
    enemiesSetted = false;
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restartGameAfterLose();
}


function restartGameAfterLose() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('lose-overlay').classList.add('d-none');
    document.getElementById('lose-overlay').classList.remove('d-flex');
    level1.enemies = [
        new Chicken(),
        new Chick(),
        new Chicken(),
        new Chick(),
        new BossChicken()
    ];  
    enemiesSetted = true;
    world.setWorld(); 
    world.draw();
}



function mobileMoveLeftStart() {
    keyboard.LEFT = true;
    moveLeftInterval = setInterval(() => {
        keyboard.LEFT = true;
    }, 100);
}

function mobileMoveLeftEnd() {
    keyboard.LEFT = false;
    clearInterval(moveLeftInterval);
}

function mobileMoveRightStart() {
    keyboard.RIGHT = true;
    moveRightInterval = setInterval(() => {
        keyboard.RIGHT = true;
    }, 100);
}

function mobileMoveRightEnd() {
    keyboard.RIGHT = false;
    clearInterval(moveRightInterval);
}

function mobileJump() {
    keyboard.SPACE = true;
    setTimeout(() => {
        keyboard.SPACE = false;
    }, 200);
}

function mobileThrow() {
    keyboard.D = true;
    setTimeout(() => {
        keyboard.D = false;
    }, 200);
}


function toggleGameSound() {
    let soundIcon = document.getElementById("soundIcon");
    const activeSound = "img/12_sound/sound-active.png";
    const inactiveSound = "img/12_sound/sound-inactive.png";
    let currentSound = soundIcon.src.replace(location.origin + "/", "");

    if (currentSound === activeSound) {
        soundIcon.src = inactiveSound;
        disableGameSounds();
    } else {
        soundIcon.src = activeSound;
        enableGameSounds();
    }
}







