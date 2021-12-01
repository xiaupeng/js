class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {
    this.load.tilemapTiledJSON("world1", "assets/Tutorial2.json");

    // Preload any images here
    this.load.image("house", "assets/house32x32.png");
    this.load.image("farm", "assets/Farm32x32.png");
    this.load.image("pipoya", "assets/Pipoya32x32.png");
    this.load.image("grass", "assets/grass32x32.png");
    this.load.image("building", "assets/Building32x32.png");
    // characters
    this.load.atlas('right', 'assets/HouYi-right.png','assets/HouYi-right.json');
    this.load.atlas('front', 'assets/HouYi-front.png','assets/HouYi-front.json');   
    this.load.atlas('back', 'assets/HouYi-back.png','assets/HouYi-back.json'); 
    this.load.atlas('left', 'assets/HouYi-left.png','assets/HouYi-left.json'); 
  }

  create() {
    console.log("*** world scene");

    // Create the map from main
    var map = this.make.tilemap({
      key: "world1",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    var tileset1 = map.addTilesetImage("house32x32", "house");
    var tileset2 = map.addTilesetImage("Farm32x32", "farm");
    var tileset3 = map.addTilesetImage("Pipoya32x32", "pipoya");
    var tileset4 = map.addTilesetImage("Building32x32", "building");
    var tileset5 = map.addTilesetImage("grass32x32", "grass");

let tilesArray = [tileset1,tileset2,tileset3,tileset4,tileset5]

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.grassLayer = map.createLayer("grassLayer", tilesArray, 0, 0);
    this.fenceLayer = map.createLayer("fenceLayer", tilesArray, 0, 0);
    this.houseLayer = map.createLayer("houseLayer", tilesArray, 0, 0);
   
    this.anims.create({
      key:'right',
      frames:[
          { key: 'right', frame: 'right-0' },
          { key: 'right', frame: 'right-01' },
          { key: 'right', frame: 'right-02' },
          { key: 'right', frame: 'right-03' },
          { key: 'right', frame: 'right-04' },
          { key: 'right', frame: 'right-05' },
          { key: 'right', frame: 'right-06' },
          { key: 'right', frame: 'right-07' },
      ],    
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key:'front',
    frames:[
        { key: 'front', frame: 'front-0' },
        { key: 'front', frame: 'front-01' },
        { key: 'front', frame: 'front-02' },
        { key: 'front', frame: 'front-03' },
        { key: 'front', frame: 'front-04' },
        { key: 'front', frame: 'front-05' },
        { key: 'front', frame: 'front-06' },
        { key: 'front', frame: 'front-07' },
    ],    
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key:'back',
    frames:[
        { key: 'back', frame: 'back-0' },
        { key: 'back', frame: 'back-01' },
        { key: 'back', frame: 'back-02' },
        { key: 'back', frame: 'back-03' },
        { key: 'back', frame: 'back-04' },
        { key: 'back', frame: 'back-05' },
        { key: 'back', frame: 'back-06' },
        { key: 'back', frame: 'back-07' },
     ],    
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key:'left',
    frames:[
        { key: 'left', frame: 'left-0' },
        { key: 'left', frame: 'left-01' },
        { key: 'left', frame: 'left-02' },
        { key: 'left', frame: 'left-03' },
        { key: 'left', frame: 'left-04' },
        { key: 'left', frame: 'left-05' },
        { key: 'left', frame: 'left-06' },
     ],    
    frameRate: 10,
    repeat: -1
});

this.physics.world.bounds.width = this.groundLayer.width*2;
this.physics.world.bounds.height = this.groundLayer.height*2;



// load player into phytsics
this.player = this.physics.add.sprite(30, 260, 'right').setScale(2)

//enable debugging 
window.player = this.player;

this.player.setCollideWorldBounds(true); // don't go out of the this.map

this.groundLayer.setCollisionByExclusion(-1, true);

this.physics.add.collider(this.player,this.groundLayer);


//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();

// make the camera follow the player
this.cameras.main.startFollow(this.player);


} // end of create //


///////////////////////////////////////////////
update () {

if(
    this.player.x > 415 &
    this.player.x < 475 &
    this.player.y > 239 &
    this.player.y < 276 
){
    this.Room1();
}

else if(
    this.player.x > 1102 &
    this.player.x < 1198 &
    this.player.y > 479 &
    this.player.y < 536
){
    this.room2();
}

// else if(
//     this.player.x > 196 &
//     this.player.x < 250 &
//     this.player.y > 727 &
//     this.player.y < 740
// ){
//     this.room3();
// }

// else if(
//     this.player.x > 773 &
//     this.player.x < 830 &
//     this.player.y > 855 &
//     this.player.y < 868
// ){
//     this.room4();
// }



if (this.cursors.left.isDown) 
{
    this.player.setVelocityX(-200);
    this.player.anims.play('left', true);
} 
else if (this.cursors.right.isDown)
{
    this.player.setVelocityX(200);
    this.player.anims.play('right', true);
}
else if (this.cursors.up.isDown)
{
    this.player.setVelocityY(-200);
    this.player.anims.play('back', true);
}
else if (this.cursors.down.isDown)
{
    this.player.setVelocityY(200);
    this.player.anims.play('front', true);
} else {
    this.player.setVelocity(0);
}

} // end of update //


//function jump to room1
Room1(player, title){
    console.log("Room1 function");
    this.scene.start('room1')
}

room2(player, title){
    console.log("room2 function");
    this.scene.start('room2')
}

// room3(player, title){
//     console.log("room3 function");
// }

// room4(player, title){
//     console.log("room4 function");
// }

 
}