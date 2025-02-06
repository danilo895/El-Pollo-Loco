const jumpSound = new Audio('audio/jump.mp3'); 
const coinSound = new Audio('audio/coinpick.mp3'); 
const bottleCollectSound = new Audio('audio/collectBottle.wav'); 
const throwSound = new Audio('audio/throw.mp3'); 
const destroyChickenSound = new Audio('audio/destroyChicken.mp3'); 
const hurtSound = new Audio('audio/hitCharacter.wav'); 
const characterDies = new Audio('audio/udie.ogg');
const winSound = new Audio('audio/wingame.wav');

const gameSounds = [jumpSound, coinSound, bottleCollectSound, throwSound, destroyChickenSound, hurtSound, characterDies, winSound];


gameSounds.forEach(sound => {
    sound.volume = 0.5;
    sound.muted = true;
});


function enableGameSounds() {
    gameSounds.forEach(sound => {
        sound.muted = false;
    });
}


function playHurtSound() {
    if (!hurtSound.muted && hurtSound.paused) {
        hurtSound.currentTime = 0;
        hurtSound.play();
    }
}
