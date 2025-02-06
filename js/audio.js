const jumpSound = new Audio('audio/jump.mp3'); 
jumpSound.volume = 0.5; 

const coinSound = new Audio('audio/coinpick.mp3'); 
coinSound.volume = 0.5;

const bottleCollectSound = new Audio('audio/collectBottle.wav'); 
bottleCollectSound.volume = 0.5;


const throwSound = new Audio('audio/throw.mp3'); 
throwSound.volume = 0.5;


const destroyChickenSound = new Audio('audio/destroyChicken.mp3'); 
destroyChickenSound.volume = 0.5;


const hurtSound = new Audio('audio/hitCharacter.wav'); 
hurtSound.volume = 0.5;
function playHurtSound() {
    if (hurtSound.paused) {
        hurtSound.currentTime = 0;
        hurtSound.play();
    }
}  

const characterDies = new Audio('audio/udie.ogg');
characterDies.volume = 0.5;

const winSound = new Audio('audio/wingame.wav');
winSound.volume = 0.5;



