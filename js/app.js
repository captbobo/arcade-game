/************************************
 ***********  ARCADE GAME ***********
 ************************************
 *
 * Built on ************************************
 * Front End Developer Nanodegree (FEND) Project
 ******************************** by Can Sürmeli
 *

*/

'use strict'

/*
 * allEnemies array, used by the engine
 */
var allEnemies = [];

/**********************************
 *********** Game Class ***********
 **********************************
 */

class Game{
  constructor(){

    // There is nothing here needed at this point of development

  }


  // Generates a single enemy with random position and speed
  // and pushes the instance of the enemy into the allEnemies array
  enemyGenerator(){
    let enemy = new Enemy();
    enemy.randomize();
    allEnemies.push(enemy);
  }

  // Starts the stream of bugs
  bugStream(){
    this.bugger = setInterval(function(){
      game.enemyGenerator()
    }, 500);
  }

  stopBugStream(){
    clearInterval(this.bugger);
    allEnemies = [];
  }

  checkCollisions(xPlayerPos, lane){
    allEnemies.forEach(function(enemy){
      if  (enemy.lane == player.lane) {
        if (xPlayerPos - 50 < enemy.xPos && xPlayerPos + 80 > enemy.xPos) {
          player.resets();
        }
      }
    })
  }

  init() {
    allEnemies = [];
    player = new Player();
    this.bugStream();
  }

  displayModal(){
    console.log('called')
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(20,80,465,475);
    ctx.fillStyle = 'white';
    ctx.font = '35px arial'
    ctx.textAlign ='center';
    ctx.fillText("You WIN",252,180);
    ctx.fillText('Press "R" to restart.',252,230);
  }
  playerWin(){
      this.stopBugStream();
      this.displayModal();
  }
}

/*
*************** END OF CLASS: Character ***************
*/

/***************************************
 *********** Character Class ***********
 ***************************************
 *
 *  This is the main class which other entities extends.
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
  /*
  *************** END OF CLASS: Character ***************
  */



/************************************
 *********** Player Class ***********
 ************************************
 */

class Player extends Character {
  constructor(sprite){
    const playerSprites = [
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess.girl.png'];

    super();
    this.xPos = 200;
    this.yPos = 404;
    this.sprite = playerSprites[0];
    this.lane = Math.ceil(this.yPos / 83);
  }

  findMyLane(){
    this.lane = Math.ceil(this.yPos / 83);
  }

  handleInput(key){
    switch (key) {
      case 'left':
        if(0 < this.xPos){
          this.xPos -= 101;
        }
        break;
      case 'up':
        if(0 < this.yPos){
          this.yPos -= 83;
          this.lane--;
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
          this.lane++;
        }
        break;
    }
    console.log(this.lane);
  }

  // Resets Player's position after collision
  resets(){
    this.xPos = 200;
    this.yPos = 404;
    this.findMyLane();
  }
}
/*
*************** END OF CLASS: Player ***************
*/


/*
 ***********************************
 *********** Enemy Class ***********
 ***********************************
 */

class Enemy extends Character {
  constructor(xPos= -50, yPos = -23, speed = 4){
    super();
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  // Randomizes enemy characteristics
  randomize(){
    this.speed = this.speed * getRandomInt(1, 3);
    this.xPos = this.xPos - getRandomInt(-10, -1) * 100;
    this.lane = getRandomInt(0, 3);
    this.yPos = this.yPos + this.lane * 83;
  }

  // Moves the enemy
  update(dt){
    this.xPos += this.speed;
  }

  /*
   * Checks if the enemy reaches the end of its lane
   * Deletes the enemy from the array of enemies
   * This function is called with for all enemies at each update() of main()
  */
  checkEndOfRunway(enemy, index) {
    if(enemy.xPos > 505){
      allEnemies.splice(index, 1);
    }
  }
}

/*
*************** END OF CLASS: Enemy ***************
*/



  /*
   * TODO: Get input: let player choose character sprite
   * and then create player obj. with that input.
   */


let player;
const game = new Game();

game.init();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'restart'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    if (allowedKeys[e.keyCode] == 'restart'){
      console.log('r');
      game.init();
    }
});

// Random integer generator: [min, max)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + 1);
}
