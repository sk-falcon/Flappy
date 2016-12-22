// Main state

var mainState = {

  // Load Images, Sound
  preload: function() {
    //Load bird sprite
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');

  },

  // Game, Dislay Sprites
  create: function() {

    game.state.backgroundColor = '#71c5cf';

    //Initiate Game Score
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
          { font: "30px Arial", fill: "#ffffff" });

    // Set the game Physic System
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird
    this.bird = game.add.sprite(100, 245, 'bird');

    //Create an empty group
    this.pipes = game.add.group();

    // Add physics to bird
    game.physics.arcade.enable(this.bird);

    //Add gravity to bird body
    this.bird.body.gravity.y = 1000;

    //Call jump func when space key is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //run timer to add pipes
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

  },

  // Game Logic
  update: function() {

    //Out of screen bird, call the restart function
    if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();

    game.physics.arcade.overlap(
      this.bird, this.pipes, this.restartGame, null, this);

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

  //Create a pipe at location x, y
  addOnePipe: function(x, y) {

    //Create a pipe sprite
    var pipe = game.add.sprite(x, y, 'pipe');

    //Add the pipe to group
    this.pipes.add(pipe);

    //enable physics on the pipe
    game.physics.arcade.enable(pipe);

    //add velocity
    pipe.body.velocity.x = -200;

    //kill pipe when not in screen
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;

  },

  addRowOfPipes: function() {

    //Pick a number between 1 and 5
    var hole = Math.floor(Math.random()*5) + 1;

    //Add the 5 pipes
    for(var i=0; i<8; i++)
      if(i!=hole && i!=hole+1 && i!=hole+2)
        this.addOnePipe(400, i * 60 +10);

    //Update Score
    this.score += 1;
    this.labelScore.text = this.score;

    },

};

// Initialise phaser; Create new screen
var game = new Phaser.Game(400, 490);

//Add mainState as 'main'
game.state.add('main', mainState);

//Start Game
game.state.start('main');
