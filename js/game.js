var Breakout = {};

Breakout.Preloader = function (game) {};

Breakout.Preloader.prototype = {

	preload: function () {
		this.load.path = 'assets/'
		this.load.image('level1-bg', 'level_1_bg.png');
		this.load.image('paddle-med', 'paddle_med.png');
		this.load.image('ball-small', 'ball_small.png');
		this.load.image('brick', 'brick.png');
	},

	create: function () {
		this.state.start('Breakout.Level1');
	}

};

Breakout.Level1 = function (game) {
	this.ball_small;
	this.ball_large;
	this.paddle_med;
	this.brick;

	this.ballOnPaddle = true;

};

Breakout.Level1.prototype = {


	create: function () {
		this.add.sprite(0, 0, 'level1-bg');
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.checkCollision.down = false;

		this.paddle_med = this.add.sprite(this.world.centerX, this.world.height - 64, 'paddle-med');
		this.paddle_med.anchor.setTo(0.5, 0.5);
		this.physics.arcade.enable(this.paddle_med);
		this.paddle_med.body.immovable = true;
		this.paddle_med.body.collideWorldBounds = true;

		this.ball_small = this.add.sprite(this.paddle_med.x, this.paddle_med.y - 8, 'ball-small');
		this.ball_small.anchor.set(0.5);
		this.physics.arcade.enable(this.ball_small);
		this.ball_small.checkWorldBounds = true;
		this.ball_small.body.collideWorldBounds = true;
		this.ball_small.body.bounce.x = 1;
		this.ball_small.body.bounce.y = 1;

		for (y = 194; y < 274; y += 21) {
			for (x = 118; x < 326; x += 52) {
				this.brick = this.add.sprite(x, y, 'brick');
			}
		}

		game.input.onDown.add(this.launchBall, this);

	},

	update: function () {
		this.physics.arcade.collide(this.ball_small, this.paddle_med, this.ballHitPaddle, null, this);
		this.paddle_med.x = this.input.mousePointer.x - 24;

		if (this.ballOnPaddle) {
			this.ball_small.x = this.paddle_med.x + 4;
		}
	},

	launchBall: function () {
		if (this.ballOnPaddle) {
			this.ballOnPaddle = false;
			this.ball_small.body.velocity.y = -300;
			this.ball_small.body.velocity.x = 75;
		}
	},

	ballHitPaddle: function () {

		var diff = 0;
	    if (this.ball_small.x < this.paddle_med.x)
	    {
	        //  Ball is on the left-hand side of the paddle
	        diff = this.paddle_med.x - this.ball_small.x;
	        this.ball_small.body.velocity.x = (-10 * diff);
	    }
	    else if (this.ball_small.x > this.paddle_med.x)
	    {
	        //  Ball is on the right-hand side of the paddle
	        diff = this.ball_small.x -this.paddle_med.x;
	        this.ball_small.body.velocity.x = (10 * diff);
	    }
	    else
	    {
	        //  Ball is perfectly in the middle
	        //  Add a little random X to stop it bouncing straight up!
	        this.ball_small.body.velocity.x = 2 + Math.random() * 8;
	    }
	}

};


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas');

game.state.add('Breakout.Preloader', Breakout.Preloader);
game.state.add('Breakout.Level1', Breakout.Level1);

game.state.start('Breakout.Preloader');







