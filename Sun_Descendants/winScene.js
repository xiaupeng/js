class winScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'winScene' });
  }

preload(){
//introImage
this.load.image('image2', 'assets/winImage-02-02.png'); 

}


  create () {

      console.log("winScene")
      

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world");

        let playerPos = {};
        playerPos.x = 20;
        playerPos.y = 353;
        playerPos.dir = "down" ;

        this.scene.start("world",{playerPos: playerPos})
      },
      this
    );

    
    this.add.image(0, 0, 'image2').setOrigin(0, 0).setScale(0.4);



      // this.add.text(50,200, 'Congratulations',
      //         { font: '50px VT323', fill: '#ffffff' });
      //   this.add.text(50,260, 'YOU HAVE WIN',
      //         { font: '50px VT323', fill: '#ffffff' });       
      //   this.add.text(50,500, 'Press spacebar to replay', 
      //       { font: '24px VT323', fill: '#ffffff' });
  




    //  var spaceDown = this.input.keyboard.addKey('SPACE');

    //   spaceDown.on('down', function(){
    //       this.scene.start("gameScene");
    //       }, this );



  }//end of

}