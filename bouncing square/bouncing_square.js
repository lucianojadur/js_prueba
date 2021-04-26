var APP = APP || {};

function Ball(size){
	//
	//El objeto vive dentro del canvas
	//Sólo pinto la sección del canvas ocupada por el cuadrado en cada frame
//private
	const _size = size;
	var _x = canvas.width / 2;
	var _y = canvas.height / 2;
	var _vx = 0; 
	var _vy = 0;
	var _color = "yellow";
		
	function move(){
		_x += _vx;
		_y += _vy;
	}
	function changeColor(){
		switch (_color){
			case "yellow": return "red";
			case "red": return "green";
			case "green": return "cyan";
			case "cyan": return "yellow";
		}
	}

	function checkBounce(){
		if (_x - _size/2 < 0 || _x + _size/2 > canvas.width){
			_vx *= -1;
			_color = changeColor();
		}
		if (_y - _size/2 < 0 || _y + _size/2 > canvas.height){
			_vy *= -1;
			_color = changeColor();
		}
	}

	function paintBall(){
		context.fillStyle = _color;
		context.fillRect(_x - _size/2, _y - _size/2, _size, _size);
	}

//public
	//
	//getters	
	this.x = function(){
		return _x;
	}
	
	this.y = function(){
		return _y;
	}

	this.size = function(){
		return _size;
	}
	
	this.vx = function(){
		return _vx;
	}

	this.vy = function(){
		return _vy;
	}
	
	this.color = function() {
		return _color;
	}

	//setters
	this.setVx = function(vx){
		_vx = vx;
	}

	this.setVy = function(vy){
		_vy = vy;
	}

	this.initVelocity = function(vx, vy){
		_vx = vx / FPS;
		_vy = vy / FPS;
		if (vx == 0 && vy == 0){
			_vx = (Math.random() * 10 + 50) / FPS;
			_vy = (Math.random() * 10 + 50) / FPS;
		}	

		if (Math.floor(Math.random() * 2) == 0)
			_vx *= -1;		
		if (Math.floor(Math.random() * 2) == 0)
			_vy *= -1;
	}

	//others
	this.update = function(context){
		move();
		checkBounce();
		//
		//actualiza la región ocupada por ball
		paintBall(context);
	}

};




const FPS = 120;
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var ball = new Ball(20);   

function paintBg(){
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function mainUpdate(){
	//actualiza el background
	paintBg();
	
	//actualiza la bola
	ball.update(context);
	console.log("Color: " + ball.color());
}

function consoleMessages(){
	console.log("Prueba de implementacion con objetos\n");
	console.log("fps = " + FPS);
	console.log("Lado: " + ball.size() + " px");
	console.log("|vx| = " + Math.abs(ball.vx()) * FPS + " pps");
	console.log("|vy| = " + Math.abs(ball.vy()) * FPS + " pps");
}

function start(vx, vy){
	try {
		vx = document.getElementById("user_vx").value;
		document.getElementById("user_vx").value = "";
	}
	catch (typeError){}
	try {
		vy = document.getElementById("user_vy").value;
		document.getElementById("user_vy").value = "";
	}
	catch (typeError) {}
	ball.initVelocity(vx, vy);
}

function run(vx=0, vy=0){
	start(vx, vy);
	consoleMessages();
	setInterval(mainUpdate, 1000 / FPS); 
}

function main() {
	run();
}

main();
