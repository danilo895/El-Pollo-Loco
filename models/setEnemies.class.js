let enemiesSetted = false;

function setEnemies() {
    document.getElementById('overlay-start-game').classList.add('d-none');
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
