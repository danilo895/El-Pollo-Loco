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
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new BossChicken()
    ];
    enemiesSetted = true;
    world.setWorld(); 
    world.draw();
}


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
        new Chicken(),
        new Chicken(),
        new Chick(),
        new BossChicken()
    ];
    enemiesSetted = true;
    world.setWorld(); 
    world.draw();
}
