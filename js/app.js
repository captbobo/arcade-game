'use strict'

class Character {
    constructor(xPos, yPos, speed, sprite){
      this.xPos = 0;
      this.yPos = 0;
      this.speed = speed;
      this.sprite = 'images/char-boy.png';
    }

    update(dt){

    }
    render(){
      ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
  };

class Player extends Character {
  constructor(sprite){
    super();
    this.xPos = 200;
    this.yPos = 404;
    this.sprite = sprite;
  }
  handleInput(key){
    console.log(`x: ${this.xPos} and y:${this.yPos}`);
    switch (key) {
      case 'left':
        if(0 < this.xPos){
          this.xPos -= 101;
        }
        break;
      case 'up':
        if(0 < this.yPos){
          this.yPos -= 83;
        }
        break;
      case 'right':
        if(this.xPos < 400){
          this.xPos += 101;
        }
        break;
      case 'down':
        if(this.yPos < 400){
          this.yPos += 83;
        }
        break;
    }
    // this.update();
    // this.render();
  }
}

class Enemy extends Character {
  constructor(){
    super();
    this.sprite = 'images/enemy-bug.png'
    
  }
}

const playerSprites = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess.girl.png'];

  /*
   * TODO: Get input: let player choose character sprite
   * and then create player obj. with that input.
   */
const player = new Player(playerSprites[0]);


let allEnemies = [],
    numEnemies = 2;

for(let i = 0; i <= numEnemies; i++) {
  let enemy = new Enemy();
  allEnemies.push(enemy);
}

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
