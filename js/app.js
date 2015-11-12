// number of enemies
var numEnemies = 3;
// initial player position
var playerPosX = 200;
var playerPosY = 395;
// recomended difficulty level between 3 and 10
var level = 5;

// Enemies our player must avoid
var Enemy = function() {
    // find initial location for each enemy
    this.y = this.findLoc();
    this.x = 1;
    // pick speed randomly
    this.speed = Math.floor(Math.random() * 5 + 1);
    //load an image for the enemy
    this.sprite = 'images/enemy-bug.png';
};

// helper function that assigns initial y location to each enemy
Enemy.prototype.findLoc = function() {
    var ranNum = Math.floor(Math.random() * 3 + 1);
        switch (ranNum) {
            case 1:
                return 60;
            case 2:
                return 145;
            case 3:
                return 230;
        }
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multipling any movement by the dt parameter
    // ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * 100;
    // reassign a new speed and initial location
    if (this.x > 505) {
        this.speed = Math.floor((Math.random() * 5) + 1);
        this.x %= 505;
        this.y = this.findLoc();
    }
    // reset player's location if collision happened
    if (Math.abs(this.x - player.x) <= 10 && Math.abs(this.y - player.y) <= 10){
        player.reset();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class
var Player = function() {
    // initial location
    this.x = playerPosX;
    this.y = playerPosY;
    // load an image for the player
    this.sprite = 'images/char-boy.png';
}

// update location of the player
// make sure that player is visible on the screen all the time
Player.prototype.update = function() {

    if (this.x < 5) {
        this.x = 5;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.y < -10) {
        player.reset();
    }

    if (this.y > playerPosY) {
        this.y = playerPosY;
    }
}

// draw a player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// move player with the keyboard
Player.prototype.handleInput = function(input) {
    switch (input) {
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 82;
            break;
        case 'down':
            this.y += 82;
            break;
    }
}

// move player to initial position
Player.prototype.reset = function() {
    this.x = playerPosX;
    this.y = playerPosY;
}

// instantiate and place all enemy objects in allEnemies array
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy());
}

// instantiate a player object
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
