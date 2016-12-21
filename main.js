//Main state

var mainState = {

  preload: function {

  },

  create: function {

  },

  update: function {

  },

}:

// Initialise phaser; Create new screen

var game = new Phaser.Game(400, 490);

//Add mainState as 'main'

game.state.add('main', mainState);

//Start Game

game.state.start('main');
