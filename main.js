// Main state

var mainState = {

  // Load Images, Sound
  preload: function() {
    //Load ice_cube sprite
    game.load.image('ice_cube', 'assets/ice_cube.png');
    game.load.image('beer_mug', 'assets/beer_mug.png');

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

    // Display the ice_cube
    this.ice_cube = game.add.sprite(100, 400, 'ice_cube');

    //Create an empty group
    this.beer_mugs = game.add.group();

    // Add physics to ice_cube
    game.physics.arcade.enable(this.ice_cube);

    //Add gravity to ice_cube body
    this.ice_cube.body.gravity.y = 1000;

    //Call jump func when space key is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //run timer to add beer_mugs
    this.timer = game.time.events.loop(2000, this.addRowOfbeer_mugs, this);

  },

  // Game Logic
  update: function() {

    //Out of screen ice_cube, call the restart function
    if (this.ice_cube.y < 0 || this.ice_cube.y > 1920)
      this.restartGame();

    game.physics.arcade.overlap(
      this.ice_cube, this.beer_mugs, this.restartGame, null, this);

  },

  // Make the ice_cube jump
  jump: function() {
    this.ice_cube.body.velocity.y = -600;
  },

  // Restart the game
  restartGame: function() {

    //Start the main state
    game.state.start('main');
  },

  //Create a beer_mug at location x, y
  addOnebeer_mug: function(x, y) {

    //Create a beer_mug sprite
    var beer_mug = game.add.sprite(x, y, 'beer_mug');

    //Add the beer_mug to group
    this.beer_mugs.add(beer_mug);

    //enable physics on the beer_mug
    game.physics.arcade.enable(beer_mug);

    //add velocity
    beer_mug.body.velocity.x = -200;

    //kill beer_mug when not in screen
    beer_mug.checkWorldBounds = true;
    beer_mug.outOfBoundsKill = true;

  },

  addRowOfbeer_mugs: function() {

    //Pick a number between 1 and 4
    var hole = Math.floor(Math.random()*4) + 1;

    //Add the 5 beer_mugs
    for(var i=0; i<10; i++)
      if(i!=hole && i!=hole+1 && i!=hole+2)
        this.addOnebeer_mug(400, i * 110 + 10);

    //Update Score
    this.score += 1;
    this.labelScore.text = this.score;

    },

};

// Initialise phaser; Create new screen
var game = new Phaser.Game(1920, 1080);

//Add mainState as 'main'
game.state.add('main', mainState);

//Start Game
game.state.start('main');
