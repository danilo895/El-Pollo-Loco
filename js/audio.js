const jumpSound = new Audio('audio/jump.mp3'); 
const coinSound = new Audio('audio/coinpick.mp3'); 
const bottleCollectSound = new Audio('audio/collectBottle.wav'); 
const throwSound = new Audio('audio/throw.mp3'); 
const destroyChickenSound = new Audio('audio/destroyChicken.mp3'); 
const hurtSound = new Audio('audio/hitCharacter.wav'); 
const characterDies = new Audio('audio/udie.ogg');
const deathboss = new Audio('audio/deathboss.wav');
const characdead = new Audio('audio/characdead.mp3');
const winSound = new Audio('audio/wingame.wav');
const losesound = new Audio('audio/udie.ogg');

const bgSound = new Audio('audio/bg-music.mp3');
bgSound.volume = 0.2;
bgSound.loop = true;

const gameSounds = [bgSound, winSound, losesound, jumpSound, coinSound, bottleCollectSound, throwSound, destroyChickenSound, hurtSound, characterDies, deathboss, characdead];



gameSounds.forEach(sound => {
    sound.muted = true;
});

function disableGameSounds() {
    gameSounds.forEach(sound => {
        sound.muted = true;
    });
    bgSound.pause();
}

function enableGameSounds() {
    gameSounds.forEach(sound => {
        sound.muted = false;
    });
    if (bgSound.paused) {
        bgSound.play().catch(error => console.warn("Audio play blocked:", error));
    }
}


function toggleGameSound() {
    let soundIcon = document.getElementById("soundIcon");
    const activeSound = "img/12_sound/sound-active.png";
    const inactiveSound = "img/12_sound/sound-inactive.png";

    let isSoundActive = soundIcon.src.endsWith("sound-active.png");

    if (isSoundActive) {
        soundIcon.src = inactiveSound;
        disableGameSounds();
    } else {
        soundIcon.src = activeSound;
        enableGameSounds();
    }
}





function playHurtSound() {
    if (!hurtSound.muted && hurtSound.paused) {
        hurtSound.currentTime = 0;
        hurtSound.play();
    }
}

