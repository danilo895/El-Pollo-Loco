/**
 * Manages all game audio, including background music, sound effects, and sound toggling.
 * Sound settings are stored in localStorage to persist between sessions.
 */
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
const sleeping = new Audio('audio/sleeping.mp3');
const bgSound = new Audio('audio/bg-music.mp3');

// Background music
bgSound.volume = 0.2;
bgSound.loop = true;
// Array of all game sounds
const gameSounds = [bgSound, sleeping, winSound, losesound, jumpSound, coinSound, bottleCollectSound, throwSound, destroyChickenSound, hurtSound, characterDies, deathboss, characdead];

/**
 * Initializes sound settings based on localStorage.
 * Ensures that sound is muted by default and updates the sound icon.
 */
window.addEventListener('load', () => {
    let soundIcon = document.getElementById("soundIcon");
    let soundEnabled = localStorage.getItem("soundEnabled") === "true";
    
    if (soundEnabled) {
        soundIcon.src = "img/12_sound/sound-active.png";
        enableGameSoundsWithClick();
    } else {
        soundIcon.src = "img/12_sound/sound-inactive.png";
        disableGameSounds();
    }
});

/**
 * Starts the background sound only after a user interaction  
 * to bypass autoplay restrictions.  
 * The interaction must be a click event -> For Example a button click (start game) or a click on the screen.
 */
function enableGameSoundsWithClick() {
    gameSounds.forEach(sound => sound.muted = false);
    if (bgSound.paused) {
        const playBgMusic = () => {
            bgSound.play().catch(error => console.warn("Audio play blocked:", error));
            document.removeEventListener("click", playBgMusic);
            document.removeEventListener("keydown", playBgMusic);
        };
        document.addEventListener("click", playBgMusic);
        document.addEventListener("keydown", playBgMusic);
    }
}

// Ensure all sounds are muted by default
gameSounds.forEach(sound => {
    sound.muted = true;
});

/**
 * Mutes all game sounds and pauses background music.
 */
function disableGameSounds() {
    gameSounds.forEach(sound => {
        sound.muted = true;
    });
    bgSound.pause();
}

/**
 * Enables all game sounds and starts background music if it's paused.
 */
function enableGameSounds() {
    gameSounds.forEach(sound => {
        sound.muted = false;
    });
    if (bgSound.paused) {
        bgSound.play().catch(error => console.warn("Audio play blocked:", error));
    }
}

/**
 * Toggles game sound on and off.
 * Updates the sound icon and saves the state in localStorage.
 */
function toggleGameSound() {
    let soundIcon = document.getElementById("soundIcon");
    const activeSound = "img/12_sound/sound-active.png";
    const inactiveSound = "img/12_sound/sound-inactive.png";
    let isSoundActive = soundIcon.src.endsWith("sound-active.png");
    if (isSoundActive) {
        soundIcon.src = inactiveSound;
        disableGameSounds();
        localStorage.setItem("soundEnabled", "false");
    } else {
        soundIcon.src = activeSound;
        enableGameSounds();
        localStorage.setItem("soundEnabled", "true");
    }
}

/**
 * Plays the hurt sound effect if it's not muted.
 */
function playHurtSound() {
    if (!hurtSound.muted && hurtSound.paused) {
        hurtSound.currentTime = 0;
        hurtSound.play();
    }
}

