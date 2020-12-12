const PLAYER_IMAGE = 'images/char-boy.png';
const BUG_IMAGE = 'images/enemy-bug.png';
const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;

var Entity = function(image) {
  this.image = new Image();
  this.image.src = image;
};
Entity.prototype.render = function() {
  ctx.drawImage(this.image, this.col * TILE_WIDTH, this.row * TILE_HEIGHT);
}


// Enemies our player must avoid
var Enemy = function() {
  Entity.call(this, BUG_IMAGE);
  this.initEnemy(this);
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
  if(this.col > 5) {
    this.initEnemy(this);
  }
  this.col = this.col + this.speed * (1 * dt);
}
Enemy.prototype.getPosition = function() {
  var pos = [Math.round(this.row), Math.round(this.col)];
  return pos;
}
Enemy.prototype.initEnemy = function initEnemy(enemy) {
  // reposition the enemy
  this.row = this.getRandomNumber(1, 4);
  this.col = this.getRandomNumber(-3, 0);
  this.speed = this.getRandomNumber(.8, 3);
}
Enemy.prototype.getRandomNumber = function getRandomNumber(min, max) {
  // Return a random number between a specified range
  if(min % 1 === 0 || max % 1 === 0) {
    // must be an integer -- return a random integer
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    // Must be a float -- return a random decimal
    return Math.random() * (max - min) + min;
  }
};

// player class controled by the user
var Player = function() {
  Entity.call(this, PLAYER_IMAGE);
  this.row = 2;
  this.col = 5;
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(direction) {
    if(direction === "left") {
      if(this.col > 0) this.col--;
    } else if(direction === "right") {
      if(this.col < 4) this.col++;
    } else if(direction === "up") {
      if(this.row > 0) this.row--;
    } else if(direction === "down") {
      if(this.row < 5) this.row++;
    }
}
Player.prototype.update = function() {

}
Player.prototype.getPosition = function() {
  var pos = [this.row, this.col];
  return pos;
}
Player.prototype.setPosition = function(row, col) {
  this.row = row;
  this.col = col;
}

// initialize all the entities on the game
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();

var player = new Player();
var allEnemies = [bug1, bug2, bug3, bug4, bug5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
