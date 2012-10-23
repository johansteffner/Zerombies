// Framework

var gameObjects = new Array();

function GameObject() {

	this.x = 0;
	this.y = 0;

	this.xDirection = 1;
	this.yDirection = 1;
	
	this.spawn = function() {
		gameObjects.push(this);
    }
	
	this.kill = function() {
		// remove
	}

}

// Game objects

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

Human.prototype = new GameObject;

// Main game loop

var canvas;
var ctx;

function init() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	this.human = new Human().spawn();

	setInterval(main, 100);

}

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	update();
	render();
};

function update() {
	for (x in gameObjects) {
		gameObjects[x].update();
	}
};

function render() {
	for (x in gameObjects) {
		gameObjects[x].draw();
	}
}

// GO!

window.onload = init;