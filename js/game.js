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
  bg.setPosition(
    this.sys.game.config.width / 2,
    this.sys.game.config.height / 2
  );

  this.add.sprite(50, 180, "player");

  let enemy1 = this.add.sprite(250, 180, "enemy");
  enemy1.flipX = true;
  enemy1.setScale(0.75);
  let enemy2 = this.add.sprite(450, 180, "enemy");
  enemy2.flipX = true;
};

// set the configuration of the game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create a new game, pass the configuraion
let game = new Phaser.Game(config);
