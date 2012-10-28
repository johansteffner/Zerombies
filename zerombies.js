// Framework

Game = {
	global: window,
	entities: new Array(),
	
	spawnEntity: function(type, x, y) {
		return new this.global[type]().spawn(x, y);
	},
	
 	checkCollisions: function() {
		for (i in this.entities) {
			for (j in this.entities) {
				if ((this.entities[i].x >= this.entities[j].x - this.entities[i].size && this.entities[i].x <= this.entities[j].x + this.entities[j].size) && (this.entities[i].y >= this.entities[j].y - this.entities[i].size && this.entities[i].y <= this.entities[j].y + this.entities[j].size)) {
					console.log('collision!');
				}
			}
		}
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
	
	this.speed = 0;
	
	this.hp = 100;
	
	this.size = 10;
	
	this.update = function() {
		this.x += this.speed * this.xDirection;
		this.y += this.speed * this.yDirection;
	}
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
	
}

Human.prototype = new Entity;

function Zombie() {

	this.color = "#ff0000";
	
	this.speed = 10;
	
	this.xDirection = 0;
	
	this.hp = 100;
	
	this.size = 10;
	
	this.update = function() {
		this.x += this.speed * this.xDirection;
		this.y += this.speed * this.yDirection;
	}
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
	
}

Zombie.prototype = new Entity;

// Main game loop

var canvas;
var ctx;

function init() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	Game.spawnEntity('Human', 20, 40);
	Game.spawnEntity('Human', 400, 100);
	Game.spawnEntity('Zombie', 400, 20);

	setInterval(main, 100);

}

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	update();
	render();
}

function update() {
	Game.checkCollisions();
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