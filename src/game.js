var config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 640, // game width
  height: 360, // game height
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update
  } // our newly created scene
};

var cursors;
// create the game, and pass it the configuration
var game = new Phaser.Game(config);

function init ()
{
  this.playerSpeed = 1.5;
}

function preload () {
  // load images
  this.load.image('background', 'assets/background.jpeg');
  this.load.image('player', 'assets/player.png');
  this.load.image('tiles', 'assets/tilesets/pixelPlatformer.png')
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/testLevel.json');
};

function create () {
  const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  const map = this.make.tilemap({ key: 'map'});
  const tileset = map.addTilesetImage('tiles_packed', 'tiles');
  const platforms = map.createLayer('Platforms', tileset, 0, 200);

  this.player = this.add.sprite(40, 0, 'player');
  this.player.setScale(0.2);
  this.cameras.main.startFollow(this.player);

  cursors = this.input.keyboard.createCursorKeys();
}

function update () {
  if (cursors.left.isDown) {
    this.player.x -= this.playerSpeed;
  }
  else if (cursors.right.isDown) {
    this.player.x += this.playerSpeed;
  }

  if (cursors.up.isDown) {
    this.player.y -= this.playerSpeed;
  }
  else if (cursors.down.isDown) {
    this.player.y += this.playerSpeed;
  }
}
