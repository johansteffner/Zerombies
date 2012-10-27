// Framework

Game = {
	global: window,
	
	spawnEntity: function(type) {
		return new this.global[type]().spawn();
	}
}

var entities = new Array();

function Entity() {

	this.x = 0;
	this.y = 0;

	this.xDirection = 1;
	this.yDirection = 1;
	
	this.spawn = function() {
		entities.push(this);
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
	
	Game.spawnEntity('Human');

	setInterval(main, 100);

}

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	update();
	render();
}

function update() {
	for (x in entities) {
		entities[x].update();
	}
}

function render() {
	for (x in entities) {
		entities[x].draw();
	}
}

// GO!

window.onload = init;