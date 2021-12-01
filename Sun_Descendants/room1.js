class room1 extends Phaser.Scene {

    constructor() {
        super('room1');
        
        // Put global variable here
    }


    init(data) {

    }

    preload() {
     this.load.tilemapTiledJSON("room1", "assets/Room1.json");

    // Preload any images here
    this.load.image("bedroom", "assets/bedroom32x32.png");
    this.load.image("floor", "assets/floor32x32.png");
    this.load.image("modern", "assets/modern32x32.png");
    this.load.image("pipoya", "assets/Pipoya32x32.png");
    }

    create() {
        console.log('*** room1 scene');
        
        // Create the map from main
    var map = this.make.tilemap({key: "room1",
      });

      var tileset1 = map.addTilesetImage("floor32x32", "floor");
      var tileset2 = map.addTilesetImage("bedroom32x32", "bedroom");
      var tileset3 = map.addTilesetImage("modern32x32", "modern");
      var tileset4 = map.addTilesetImage("Pipoya32x32", "pipoya");

      let tilesArray = [tileset1,tileset2,tileset3,tileset4]

   // Load in layers by layers
   this.floorLayer = map.createLayer("floorLayer", tilesArray, 0, 0);
   this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
   this.itemsLayer = map.createLayer("itemsLayer", tilesArray, 0, 0);
   this.foodsLayer = map.createLayer("foodsLayer", tilesArray, 0, 0);

//    this.physics.world.bounds.width = this.groundLayer.width*2;
//    this.physics.world.bounds.height = this.groundLayer.height*2;



// load player into phytsics
this.player = this.physics.add.sprite(30, 260, 'back').setScale(2)

//enable debugging 
window.player = this.player;

this.player.setCollideWorldBounds(true); // don't go out of the this.map

// this.groundLayer.setCollisionByExclusion(-1, true);

// this.physics.add.collider(this.player,this.groundLayer);


//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();

// make the camera follow the player
this.cameras.main.startFollow(this.player);

  
 }//end of create

    update() {

        if(
            this.player.x > 280 &
            this.player.x < 353 &
            this.player.y > 513 &
            this.player.y < 556 
        ){
            this.world();
        }
        


        
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
    }

    //function jump to room1
world(player, title){
    console.log("world function");
    this.scene.start('world')
}

}
