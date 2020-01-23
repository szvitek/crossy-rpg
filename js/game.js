// create a new scene
let gameScene = new Phaser.Scene("Game");

// initiate scene parameters
gameScene.init = function() {
  this.playerSpeed = 3;
};

// load assets
gameScene.preload = function() {
  // load images
  this.load.image("background", "assets/background.png");
  this.load.image("player", "assets/player.png");
  this.load.image("enemy", "assets/dragon.png");
  this.load.image("goal", "assets/treasure.png");
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

  // goal
  this.goal = this.add
    .sprite(
      this.sys.game.config.width - 80,
      this.sys.game.config.height / 2,
      "goal"
    )
    .setScale(0.5);
};

// this is called up to 60 times per sec
gameScene.update = function() {
  // check for active input
  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  // treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    // restart the scene
    this.scene.restart();
    return;
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
