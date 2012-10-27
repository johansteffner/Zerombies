// Framework

Game = {
	global: window,
	entities: new Array(),
	
	spawnEntity: function(type, x, y) {
		return new this.global[type]().spawn(x, y);
	}
}

function Entity() {

	this.x = 0;
	this.y = 0;

	this.xDirection = 1;
	this.yDirection = 1;
	
	this.spawn = function(x, y) {
		this.x = x;
		this.y = y;
		Game.entities.push(this);
    }
	
	this.kill = function() {
		// remove
	}

}

// Game objects (entities)

function Human() {

	this.color = "#000";
	
	this.speed = 10;
	
	this.hp = 100;
	
	this.update = function() {
		this.x += this.speed * this.xDirection;
		this.y += this.speed * this.xDirection;
	}
	
	this.draw = function() {
		ctx.fillRect(this.x, this.y, 10, 10);
	}
	
}

Human.prototype = new Entity;

// Main game loop

var canvas;
var ctx;

function init() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	Game.spawnEntity('Human', 20, 40);
	Game.spawnEntity('Human', 400, 100);

	setInterval(main, 100);

}

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	update();
	render();
}

function update() {
	for (x in Game.entities) {
		Game.entities[x].update();
	}
}

function render() {
	for (x in Game.entities) {
		Game.entities[x].draw();
	}
}

// GO!

window.onload = init;