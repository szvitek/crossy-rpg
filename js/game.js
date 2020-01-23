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

  this.player = this.add.sprite(50, 180, "player");

  this.enemy1 = this.add.sprite(250, 180, "enemy");
  this.enemy1.flipX = true;
  this.enemy1.setScale(0.75);
  this.enemy2 = this.add.sprite(450, 180, "enemy");
  this.enemy2.flipX = true;

  // rotate by.angle
  // this.player.setAngle(-45);
  this.player.angle = -45;

  // rotate by rad
  // this.enemy2.setRotation(Math.PI / 4);
  this.enemy2.rotation = Math.PI / 4;
};

// this is called up to 60 times per sec
gameScene.update = function() {
  // this.enemy1.x += 1;
  // this.enemy1.angle++;
  if (this.enemy1.scaleX < 2) {
    this.enemy1.scaleX += 0.01;
    this.enemy1.scaleY += 0.01;
  }
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
