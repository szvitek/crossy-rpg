// create a new scene
let gameScene = new Phaser.Scene("Game");

// load assets
gameScene.preload = function() {
  // load images
  this.load.image("background", "assets/background.png");
  this.load.image("player", "assets/player.png");
  this.load.image("enemy", "assets/dragon.png");
};

gameScene.create = function() {
  // create bg sprite
  let bg = this.add.sprite(0, 0, "background");

  // change the origin to the top-left corner
  bg.setOrigin(0, 0);

  // create the player
  this.player = this.add.sprite(50, 180, "player");

  // reduce the scale of the player by 50%
  this.player.setScale(0.5);
};

// this is called up to 60 times per sec
gameScene.update = function() {};

// set the configuration of the game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create a new game, pass the configuraion
let game = new Phaser.Game(config);
