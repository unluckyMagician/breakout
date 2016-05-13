var Breakout = {};

Breakout.Preloader = function (game) {};

Breakout.Preloader.prototype = {

	preload: function () {
		this.load.path = 'assets/'
		this.load.image('bg', 'bg.png');
		this.load.image('paddle', 'paddle.png');
		this.load.image('ball', 'ball.png');
		this.load.image('wall-left', 'walls-vertical-left.png');
		this.load.image('wall-right', 'walls-vertical-right.png');
		this.load.image('ceiling', 'walls-ceiling.png');
		this.load.physics('paddle-physics', 'physics/paddle-physics.json');
	},

	create: function () {
		this.state.start('Breakout.Level1');
	}

};

Breakout.Level1 = function (game) {
	this.paddle;
	this.cursors;
	this.walls;
};

Breakout.Level1.prototype = {

	create: function () {
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.add.sprite(0, 0, 'bg');

		this.walls = this.add.group();
		this.walls.enableBody = true;
		var wall_left = this.walls.create(0, 0, 'wall-left');
		var wall_right = this.walls.create(this.world.width - 16, 0, 'wall-right');
		wall_left.body.immovable = true;

		this.paddle = this.add.sprite(this.world.centerX - 32, this.world.height - 64, 'paddle');
		this.physics.p2.enable(this.paddle);
		this.paddle.body.kinematic = true;
		this.paddle.body.collideWorldBounds = true;

		this.cursors = this.input.keyboard.createCursorKeys();

	},

	update: function () {
		this.physics.arcade.collide(this.walls, this.paddle);
		this.updatePaddle();
	},

	updatePaddle: function () {

		if (this.cursors.left.isDown) {
			this.paddle.body.velocity.x = -400;
		} else if (this.cursors.right.isDown) {
			this.paddle.body.velocity.x = 400;
		} else {
			this.paddle.body.velocity.x = 0;
		}
	}
};


var game = new Phaser.Game(592, 640, Phaser.AUTO, 'game-canvas');

game.state.add('Breakout.Preloader', Breakout.Preloader);
game.state.add('Breakout.Level1', Breakout.Level1);

game.state.start('Breakout.Preloader');







