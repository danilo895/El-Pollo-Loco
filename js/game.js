let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    

    console.log('My Charakter is', world.character);
    console.log('My enemies are', world.enemies)

}

window.addEventListener("keypress",(e) =>{
    console.log(e);
} )