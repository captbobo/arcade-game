'use strict'

class Character = {
    constructor(xPos, yPos, speed, sprite){
      this.xPos = 100;
      this.yPos = 100;
      this.speed = speed;
      this.sprite = sprite;

    }

    update(dt){

    }
    render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  };

class Player extends Character = {
  constructor(sprite){
    this.xPos = 100;
    this.yPos = 100;
  }
  handleInput(){

  }
}

class Enemy extends Character = {
  constructor(){
    super(speed, sprite)
  }
}
const player = new Player('');

console.log(player);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
