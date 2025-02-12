let canvas;
let world;
let moveLeftInterval, moveRightInterval;
let keyboard = new Keyboard();
let enemiesSetted = false;

/**
 * Initializes the game, sets up the canvas, and starts the world.
 */
function init() {
    canvas = document.getElementById('canvas');
    level1 = createLevel();
    world = new World(canvas, keyboard, level1);
    
    setTimeout(() => {
        enableStartButton();
    }, 500);
}
/**
 * Enables the start game button after a delay. Game has to be loaded before game can start.
 */
function enableStartButton() {
    document.getElementById("start-game-button").disabled = false;
}

/**
 * Listens for keydown events and updates the keyboard state.
 */
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

/**
 * Listens for keyup events and updates the keyboard state.
 */
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

/**
 * Returns to the main menu after a win.
 */
function backToMainMenu(){
    document.getElementById('win-overlay').classList.remove('d-flex');
    document.getElementById('win-overlay').classList.add('d-none');
    resetGameFully();
}

/**
 * Returns to the main menu after losing.
 */
function backToMainMenuAfterLose(){
    document.getElementById('lose-overlay').classList.remove('d-flex');
    document.getElementById('lose-overlay').classList.add('d-none');
    document.getElementById('start-overlay').classList.remove('d-none');
    resetGameFully();
}

/**
 * Resets the game completely and returns to the start screen.
 */
function resetGameFully() {
    stopAllIntervals();
    if (world && world.animationFrameId) {
        cancelAnimationFrame(world.animationFrameId);
    }
    cancelAnimationFrame(world.animationFrameId);
    document.getElementById("start-game-button").disabled = true;
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start-overlay').classList.remove('d-none');

    level1.enemies = [];
    level1.coins = [];
    level1.tabascoBottles = [];
    throwableObjects = [];
    enemiesSetted = false;
    level1 = createLevel();

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
        world = null;
        init();
    }, 100);
}


/**
 * Resets the game after losing and prepares for a restart.
 */
function resetGameLose() {
    stopAllIntervals();
    world = null;
    level1.enemies = [];
    level1.coins = [];
    level1.tabascoBottles = [];
    throwableObjects = []; 
    enemiesSetted = false;
    level1 = createLevel();
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
}




/**
 * Starts a new game after winning.
 */
function startGameAgain() {
    document.getElementById('win-overlay').classList.remove('d-flex');
    document.getElementById('win-overlay').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    setEnemiesForRetry();
}

/**
 * Re-adds enemies to the game after restarting.
 */
function setEnemiesForRetry() {
    if (enemiesSetted) {
        return;
    }
    level1.enemies = [];
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

/**
 * Displays the winning screen after a short delay.
 */
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

document.addEventListener("contextmenu", function (event) {
    if (event.target.closest(".nav-control-buttons")) {
        event.preventDefault();
    }
});


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


function showImprint(){
    document.getElementById('start-overlay').classList.remove('d-flex');
    document.getElementById('start-overlay').classList.add('d-none');
    document.getElementById('imprint-overlay').classList.remove('d-none');
    document.getElementById('imprint-overlay').classList.add('d-flex');
}

function removeImprint(){
    document.getElementById('imprint-overlay').classList.remove('d-flex');
    document.getElementById('imprint-overlay').classList.add('d-none');
    document.getElementById('start-overlay').classList.remove('d-none');
    document.getElementById('start-overlay').classList.add('d-flex');
}

function showInstructions(){
    document.getElementById('start-overlay').classList.remove('d-flex');
    document.getElementById('start-overlay').classList.add('d-none');
    document.getElementById('instructions-overlay').classList.remove('d-none');
    document.getElementById('instructions-overlay').classList.add('d-flex');
}

function removeInstructions(){
    document.getElementById('instructions-overlay').classList.remove('d-flex');
    document.getElementById('instructions-overlay').classList.add('d-none');
    document.getElementById('start-overlay').classList.remove('d-none');
    document.getElementById('start-overlay').classList.add('d-flex');
}

/**
 * Resets the game after winning.
 */
function resetGame() {
    setTimeout(() => {
        world = null;
        level1.enemies = [];
        level1.coins = [];
        level1.tabascoBottles = [];
        enemiesSetted = false;
        level1 = createLevel();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stopAllIntervals();
        init();
    }, 1500);
}

function stopAllIntervals() {
    let highestId = setInterval(() => {}, 1000);
    for (let i = 0; i <= highestId; i++) {
        clearInterval(i);
    }
}

function stopAllIntervalsExceptEndbossDeath(deathInterval) {
    let highestId = setInterval(() => {}, 1000);
    for (let i = 0; i <= highestId; i++) {
        if (i !== deathInterval) {
            clearInterval(i);
        }
    }
}









