class main extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'main' });
  }

preload(){
 // characters
 this.load.atlas('right', 'assets/HouYi-right.png','assets/HouYi-right.json');
 this.load.atlas('front', 'assets/HouYi-front.png','assets/HouYi-front.json');   
 this.load.atlas('back', 'assets/HouYi-back.png','assets/HouYi-back.json'); 
 this.load.atlas('left', 'assets/HouYi-left.png','assets/HouYi-left.json'); 
//introImage
this.load.image('image', 'assets/introImage-01.png'); 

}


  create () {

      console.log("main")
      
          //animation
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
      

      //this.physics.add.sprite(479, 513, 'right').setScale(0.5)

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

    this.add.image(0, 0, 'image').setOrigin(0, 0).setScale(0.4);



      // this.add.text(50,200, 'Descendants',
      //         { font: '50px VT323', fill: '#ffffff' });
      //   this.add.text(50,260, 'Of The Sun',
      //         { font: '50px VT323', fill: '#ffffff' });       
      //   this.add.text(50,500, 'Press spacebar to continue', 
      //       { font: '24px VT323', fill: '#ffffff' });
  




    //  var spaceDown = this.input.keyboard.addKey('SPACE');

    //   spaceDown.on('down', function(){
    //       this.scene.start("gameScene");
    //       }, this );



  }//end of

}