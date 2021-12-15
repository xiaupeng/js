class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
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
    //sprites
    this.load.atlas('elixir', 'assets/elixir.png','assets/elixir.json');
   //sound
    this.load.audio('mapBGM','assets/mapBGM.mp3');
  }

  create() {
    console.log("*** world scene");

    this.music = this.sound
    .add("mapBGM",{
        loop : true,
    })
    .setVolume(0.2);
    this.mapBGM = this.music;
  
    this.music.play();



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
    this.connectedLayer = map.createLayer("connectedLayer", tilesArray, 0, 0);
    this.houseLayer = map.createLayer("houseLayer", tilesArray, 0, 0);
  


    // //spritesNORMAL
    // this.anims.create({
    //   key: 'elixir',
    //   frames: this.anims.generateFrameNumbers('elixir', { start: 0, end: 2 }),
    //   frameRate: 5,
    //   repeat: -1
    //   });



    this.anims.create({
      key:'elixiranims', 
      frames:[
          { key: 'elixir', frame: 'elixir01' },
          { key: 'elixir', frame: 'elixir02' },
          { key: 'elixir', frame: 'elixir03' },
      ],    
      frameRate: 10,
      repeat: -1
  });



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



//display ICON
this.elixir1 = this.add.sprite(30,50,"elixir").setScale(1.5).setScrollFactor(0);

this.physics.world.bounds.width = this.groundLayer.width;
this.physics.world.bounds.height = this.groundLayer.height;

this.player = this.physics.add.sprite(
  this.playerPos.x,
  this.playerPos.y,
  this.playerPos.dir
).setScale(1.7)




// // load player into phytsics
// this.player = this.physics.add.sprite(30, 350, 'right').setScale(2)

//enable debugging 
window.player = this.player;


//collectables
this.elixir = this.physics.add
.sprite(130,353,'elixir')
.play("elixiranims")
.setScale(1)
.setSize(18,18);
this.elixir2 = this.physics.add
.sprite(580,859,'elixir')
.play("elixiranims")
.setScale(1)
.setSize(18,18);



// this.physics.add.overlap(
//   this.player,
//   this.enemyElixir,
//   this.collectElixir,
//   null,this
// );


this.player.setCollideWorldBounds(true); // don't go out of the this.map

this.fenceLayer.setCollisionByExclusion(-1, true);
this.houseLayer.setCollisionByExclusion(-1, true);
this.grassLayer.setCollisionByExclusion(-1, true);

this.physics.add.collider(this.player,this.fenceLayer);
this.physics.add.collider(this.player,this.houseLayer);
this.physics.add.collider(this.player,this.grassLayer);

this.physics.add.overlap(this.player,this.elixir,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.elixir1,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.elixir2,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.elixir3,this.collectElixir,null,this);

//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();

// make the camera follow the player
this.cameras.main.startFollow(this.player);


// this.player = this.physics.add.sprite(
//   this.playerPos.x,
//   this.playerPos.y,
//   this.playerPos.dir
// )

this.elixirScore = this.add.text(55,40,'elixir:0',{
  fontSize:'20px',
  fill:'#ffffff'
}).setScrollFactor(0);



} // end of create //


///////////////////////////////////////////////
update () {

if(
    this.player.x > 416 &
    this.player.x < 480 &
    this.player.y > 288 &
    this.player.y < 295
){
    this.Room1();
}

else if(
    this.player.x > 1107 &
    this.player.x < 1180 &
    this.player.y > 539 &
    this.player.y < 547
){
    this.room2();
}

else if(
    this.player.x > 101 &
    this.player.x < 204 &
    this.player.y > 1046 &
    this.player.y < 1060
){
    this.room3();
}

else if(
    this.player.x > 1146 &
    this.player.x < 1176 &
    this.player.y > 1065
){
    this.room4();
}



if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play("left", true);
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(200);
    this.player.anims.play("right", true);
  } else if (this.cursors.up.isDown) {
    this.player.body.setVelocityY(-200);
    this.player.anims.play("back", true);
    //console.log('up');
  } else if (this.cursors.down.isDown) {
    this.player.body.setVelocityY(200);
    this.player.anims.play("front", true);
    //console.log('down');
  } else {
    this.player.anims.stop();
    this.player.body.setVelocity(0, 0);
  }

} // end of update //


// function to collect elixir
collectElixir(player,elixir){
  console.log("collectElixir");
elixir.disableBody(true,true);
  // this.popsnd.play();
 window.elixir = window.elixir + 1;
 this.elixirScore.setText('elixir: ' + window.elixir)
    console.log("elixir", window.elixir);
    
 }


//function jump to room1
Room1(player, title){
    console.log("Room1 function");
      let playerPos = {};
      playerPos.x = 325;
      playerPos.y = 493;
      playerPos.dir = "back";
      this.mapBGM.loop = false;
      this.mapBGM.stop();
      this.scene.start("room1",{ playerPos: playerPos });
  }

  room2(player, title){
    console.log("room2 function");
    let playerPos = {};
    playerPos.x = 325;
    playerPos.y = 496;
    playerPos.dir = "back";
    this.mapBGM.loop = false;
    this.mapBGM.stop();
    this.scene.start('room2',{ playerPos: playerPos });
}

room3(player, title){
  console.log("room3 function");
  let playerPos = {};
  playerPos.x = 325;
  playerPos.y = 496;
  playerPos.dir = "back";
  this.mapBGM.loop = false;
    this.mapBGM.stop();
  this.scene.start('room3',{ playerPos: playerPos });
}

room4(player, title){
  console.log("room3 function");
  let playerPos = {};
  playerPos.x = 320;
  playerPos.y = 526;
  playerPos.dir = "back";
  this.mapBGM.loop = false;
    this.mapBGM.stop();
  this.scene.start('room4',{ playerPos: playerPos });
}


}//end


// room3(player, title){
//     console.log("room3 function");
// }

// room4(player, title){
//     console.log("room4 function");
// }


