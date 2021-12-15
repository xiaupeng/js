class room4 extends Phaser.Scene {

    constructor() {
        super('room4');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    }

    preload() {
     this.load.tilemapTiledJSON("room4", "assets/room4.json");

    // Preload any images here
    this.load.image("bedroom", "assets/bedroom32x32.png");
    this.load.image("floor", "assets/floor32x32.png");
    this.load.image("modern", "assets/modern32x32.png");
    this.load.image("pipoya", "assets/Pipoya32x32.png");
    this.load.image("toilet", "assets/toilet32x32.png");

  //sprites
this.load.atlas('elixir', 'assets/elixir.png','assets/elixir.json');
//SUNsprites
this.load.atlas('sun', 'assets/sun.png','assets/sun.json');
//sound
this.load.audio('room1BGM','assets/room1BGM.mp3');

    }

    
    create() {
        console.log('*** room4 scene');
        
        this.music = this.sound
        .add("room1BGM",{
            loop : true,
        })
        .setVolume(0.2);
        this.room1BGM = this.music;
      
        this.music.play();


        // Create the map from main
    var map = this.make.tilemap({key: "room4",
      });

      var tileset1 = map.addTilesetImage("floor32x32", "floor");
      var tileset2 = map.addTilesetImage("bedroom32x32", "bedroom");
      var tileset3 = map.addTilesetImage("modern32x32", "modern");
      var tileset4 = map.addTilesetImage("Pipoya32x32", "pipoya");
      var tileset5 = map.addTilesetImage("toilet32x32", "toilet");

      let tilesArray = [tileset1,tileset2,tileset3,tileset4,tileset5]

   // Load in layers by layers
   this.floorLayer = map.createLayer("floorLayer", tilesArray, 0, 0);
   this.doorLayer = map.createLayer("doorLayer", tilesArray, 0, 0);
   this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
   this.itemsLayer = map.createLayer("itemsLayer", tilesArray, 0, 0);

//    this.physics.world.bounds.width = this.groundLayer.width*2;
//    this.physics.world.bounds.height = this.groundLayer.height*2;

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
  key:'sunanims', 
  frames:[
      { key: 'sun', frame: 'sun01' },
      { key: 'sun', frame: 'sun02' },
      { key: 'sun', frame: 'sun03' },
  ],    
  frameRate: 10,
  repeat: -1
});

//collectablesSUN
this.sun = this.physics.add
.sprite(443,260,'sun')
.play("sunanims")
.setScale(2)
.setSize(18,18);


//collectables
this.elixir2 = this.physics.add
.sprite(59,132,'elixir')
.play("elixiranims")
.setScale(1)
.setSize(18,18);
this.elixir3 = this.physics.add
.sprite(187,260,'elixir')
.play("elixiranims")
.setScale(1)
.setSize(18,18);
this.elixir = this.physics.add
.sprite(59,420,'elixir')
.play("elixiranims")
.setScale(1)
.setSize(18,18);


//display ICON
this.elixir1 = this.add.sprite(30,50,"elixir").setScale(1.5).setScrollFactor(0);


this.player = this.physics.add.sprite(
    this.playerPos.x,
    this.playerPos.y,
    this.playerPos.dir
).setScale(1.7)



// // load player into phytsics
// this.player = this.physics.add.sprite(30, 260, 'back').setScale(2)

//enable debugging 
window.player = this.player;

this.player.setCollideWorldBounds(true); // don't go out of the this.map

this.wallLayer.setCollisionByExclusion(-1, true);
this.itemsLayer.setCollisionByExclusion(-1, true);

this.physics.add.collider(this.player,this.wallLayer);
this.physics.add.collider(this.player,this.itemsLayer);

this.physics.add.overlap(this.player,this.elixir,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.elixir1,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.elixir2,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.elixir3,this.collectElixir,null,this);
this.physics.add.overlap(this.player,this.sun,this.collectSun,null,this);
// this.groundLayer.setCollisionByExclusion(-1, true);

// this.physics.add.collider(this.player,this.groundLayer);


//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();

// make the camera follow the player
this.cameras.main.startFollow(this.player);

this.elixirScore = this.add.text(55,40,'elixir:0',{
  fontSize:'20px',
  fill:'#ffffff'
}).setScrollFactor(0);

  
 }//end of create

    update() {

    if(
      this.player.x > 433 &&
      this.player.y < 280
    ) {
      this.winScene();
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
    } //end of update

// function to collect elixir
collectElixir(player,elixir){
  console.log("collectElixir");
elixir.disableBody(true,true);
  // this.popsnd.play();
 window.elixir = window.elixir + 1;
 this.elixirScore.setText('elixir: ' + window.elixir)
    console.log("elixir", window.elixir);
    
 }


// function to collect sun
collectSun(player,sun){
  console.log("collectSun");
sun.disableBody(true,true);
//   this.popsnd.play();
//  window.elixir = window.elixir + 1;
//  this.elixirScore.setText('elixir: ' + window.elixir)
//     console.log("elixir", window.elixir);
    
 }

 winScene(player, title) {
  console.log("winScene function");
  this.room1BGM.loop = false;
  this.room1BGM.stop();
  this.scene.start('winScene');
}





 //BACK TO WORLD
//     world(player, title){
//     console.log("world function");
//     let playerPos = {};
//     playerPos.x = 1083;
//     playerPos.y = 1069;
//     this.room1BGM.loop = false;
//     this.room1BGM.stop();
//     playerPos.dir = "front";

//     this.scene.start("world",{ playerPos: playerPos })
// }




}
