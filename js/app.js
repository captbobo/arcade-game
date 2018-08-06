/************************************
 ***********  ARCADE GAME ***********
 ************************************
 *
 * Built upon Front End Developer Nanodegree (FEND) Project 7
 * by Can Sürmeli
 *

*/


'use strict'

/*****************************
 ****** Character Class ******
 *****************************
 *
 *  This is the main class which other entities in
 *  the game extends from.
 */

class Character {
    constructor(){

    }
    update(dt){

    }
    render(){
      ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
  };

/**************************
 ****** Player Class ******
 **************************
 */

class Player extends Character {
  constructor(sprite){
    super();
    this.xPos = 200;
    this.yPos = 404;
    this.sprite = sprite;
  }
  handleInput(key){
    // console.log(`x: ${this.xPos} and y:${this.yPos}`);
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
  }
}

/*************************
 ****** Enemy Class ******
 *************************
 */

class Enemy extends Character {
  constructor(xPos= -50, yPos = -23, speed = 6){
    super();
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  randomize(){
            this.speed = this.speed * getRandomInt(1, 4);
            this.xPos = this.xPos - getRandomInt(-10, -1) * 100;
            this.yPos = this.yPos + getRandomInt(0, 3) * 83;
            console.log(`x: ${this.xPos} and y:${this.yPos}`);

          }


  update(dt){
    this.xPos += this.speed;
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
    numEnemies = 5;

for(let i = 0; i <= numEnemies; i++) {
  let enemy = new Enemy();
  enemy.randomize();
  allEnemies.push(enemy);
}

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + 1);
}
