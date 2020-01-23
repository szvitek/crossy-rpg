// create a new scene
let gameScene = new Phaser.Scene("Game");

// initiate scene parameters
gameScene.init = function() {
  this.playerSpeed = 3;

  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 5;

  this.enemyMinY = 80;
  this.enemyMaxY = 280;
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
  this.player = this.add.sprite(40, 180, "player");

  // reduce the scale of the player by 50%
  this.player.setScale(0.45);

  // goal
  this.goal = this.add
    .sprite(
      this.sys.game.config.width - 80,
      this.sys.game.config.height / 2,
      "goal"
    )
    .setScale(0.5);

  // enemy
  this.enemies = this.add.group({
    key: "enemy",
    repeat: 5,
    setXY: {
      x: 90,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  // setting the scale of all group elements
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // set flipX, and speed
  Phaser.Actions.Call(
    this.enemies.getChildren(),
    function(enemy) {
      // flip enemy
      enemy.flipX = true;

      // set speed
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speed =
        this.enemyMinSpeed +
        Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);

      enemy.speed = dir * speed;
    },
    this
  );
};

// this is called up to 60 times per sec
gameScene.update = function() {
  // check for active input
  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  // treasure overlap check
  const playerRect = this.player.getBounds();
  const treasureRect = this.goal.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    // restart the scene
    this.scene.restart();
    return;
  }

  // get enemies
  const enemies = this.enemies.getChildren();

  for (const enemy of enemies) {
    // enemy movement
    enemy.y += enemy.speed;

    // check we haven't passed min or max Y
    const conditionUp = enemy.speed < 0 && enemy.y <= this.enemyMinY;
    const conditionDown = enemy.speed > 0 && enemy.y >= this.enemyMaxY;

    if (conditionUp || conditionDown) {
      enemy.speed *= -1;
    }

    // check enemy overlap
    let enemyRect = enemy.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      console.log("game over");
      // restart the scene
      this.scene.restart();
      return;
    }
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
