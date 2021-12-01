class main extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'main' });
  }


  create () {

      console.log("main")
      this.add.text(50,200, 'Descendants',
            { font: '50px VT323', fill: '#ffffff' });
      this.add.text(50,260, 'Of The Sun',
            { font: '50px VT323', fill: '#ffffff' });       
      this.add.text(50,500, 'Press spacebar to continue', 
          { font: '24px VT323', fill: '#ffffff' });

      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
          this.scene.start("world");
          }, this );

  }

}