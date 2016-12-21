// Main state

var mainState = {

  // Load Images, Sound
  preload: function() {
    //Load bird sprite
    game.load.image('bird', 'assets/bird.png');

  },

  // Game, Dislay Sprites
  create: function() {

    game.state.backgroundColor = '#71c5cf';

    // Set the game Physic System
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to bird
    game.physics.arcade.enable(this.bird);

    //Add gravity to bird body
    this.bird.body.gravity.y = 1000;

    //Call jump func when space key is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

  },

  // Game Logic
  update: function() {

    //Out of screen bird, call the restart function
    if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();

  },

  // Make the bird jump
  jump: function() {
    this.bird.body.velocity.y = -350;
  },

  // Restart the game
  restartGame: function() {

    //Start the main state
    game.state.start('main');
  },

};

// Initialise phaser; Create new screen
var game = new Phaser.Game(400, 490);

//Add mainState as 'main'
game.state.add('main', mainState);

//Start Game
game.state.start('main');
