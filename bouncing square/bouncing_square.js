var APP = APP || {};


/*OBJETOS
	//
	//PRIVADO:
	//Los atributos privados se declaran como cualquier variable/constante común.
	//Los métodos privados se declaran como una función cualquiera, pero que estén dentro del scope
	//de la declaración de la clase los hace privados
	//
	//PÚBLICO:
	//	Para definir a algo de la clase como público se usa this.<nombre>
	//
	//Los atributos se declaran con this.atributo (igual siempre los vamos a hacer privados)
	//Los métodos públicos se declaran como si fuesen atributos y luego se igualan a una 
	//función lambda/anónima
*/

function Ball(size){
//private
	const _size = size;
	var _bx = canvas.width / 2;
	var _by = canvas.height / 2;
	var _vx; 
	var _vy;
	var _color = "yellow";


	function changeColor(){
		switch (_color){
			case "yellow": return "red";
			case "red": return "green";
			case "green": return "cyan";
			case "cyan": return "yellow";
		}
	}

	function checkBounce(){
		if (_bx - _size / 2 < 0 || _bx + _size / 2 > canvas.width){
			_vx *= -1;
			_color = changeColor();
		}
		if (_by - _size / 2 < 0 || _by + _size / 2 > canvas.height){
			_vy *= -1;
			_color = changeColor();
		}
	}

	function paintBall(){
		context.fillStyle = _color;
		context.fillRect( _bx - _size / 2, _by - _size / 2, _size, _size);
	}

//public
	//getters	
	this.bx = function(){
		return _bx;
	}
	
	this.by = function(){
		return _by;
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
	this.move = function(){
		_bx += _vx;
		_by += _vy;
	}

	this.initVelocity = function(){
		_bx = canvas.width / 2;
		_by = canvas.height / 2;
		_vx = Math.floor(Math.random() * 50 + 50) / FPS;
		_vy = Math.floor(Math.random() * 50 + 50) / FPS;
		
		if (Math.floor(Math.random() * 2) == 0){
			_vx *= -1;
		}
		if (Math.floor(Math.random() * 2) == 0){
			_vy *= -1;
		}
	}
	
	this.initColor = function(){
		_color = "yellow";
	}

	//others
	this.update = function(context,vx,vy){
		if (vx)
			_vx = vx / FPS;
		if (vy)
			vy = vy / FPS;
		_bx += _vx;
		_by += _vy;
		
		checkBounce();
	
		//actualiza la región ocupada por ball
		paintBall(context);
	}

};




const FPS = 120;
var canvas;
var context;
canvas = document.getElementById("mainCanvas");
context = canvas.getContext("2d");

var ball = new Ball(20);   

function paintBg(){
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function mainUpdate(vx=0, vy=0){
	//actualiza el background
	paintBg();

	//actualiza la bola
	ball.update(context,vx,vy);
	console.log("Color: " + ball.color());
}


function main(vx, vy) {
	if (vx && vy){
		setInterval(mainUpdate, 1000 / FPS); 
	}
	ball.initVelocity();
	
	console.log("Prueba de implementacion con objetos\n");
	console.log("fps = " + FPS);
	console.log("Lado: " + ball.size() + " px");
	console.log("|vx| = " + Math.abs(ball.vx()) * 100 + " pps")
	console.log("|vy| = " + Math.abs(ball.vy()) * 100 + " pps");

	setInterval(mainUpdate, 1000 / FPS); 
}
main();
	

	//FUNCIONES
/*    function initVelocity() {
		vx = Math.floor(Math.random() * 50 + 50) / FPS;
		vy = Math.floor(Math.random() * 50 + 50) / FPS;
		
		if (Math.floor(Math.random() * 2) == 0){
			vx *= -1;
		}
		if (Math.floor(Math.random() * 2) == 0){
			vy *= -1;
		}
	}
	
	function checkBounce(){
		if (bx - ballSize / 2 < 0 || bx + ballSize / 2 > canvas.width){
			vx *= -1;
			ballColor = changeBallColor(ballColor);
		}
		if (by - ballSize / 2 < 0 || by + ballSize / 2 > canvas.height){
			vy *= -1;
			ballColor = changeBallColor(ballColor);
		}
	}
	
	function changeBallColor(color){
		switch (color){
			case "yellow": return "red";
			case "red": return "green";
			case "green": return "cyan";
			case "cyan": return "yellow";
		}
	}

	function paintBg(){
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	function paintBall(color){
		context.fillStyle = color;
		context.fillRect(bx - ballSize / 2, by - ballSize / 2, ballSize, ballSize);
	}

	function update(){
		bx += vx;
		by += vy;
		
		checkBounce();
	
		//actualiza el background
		paintBg();
		//actualiza la región ocupada por ball
		paintBall(ballColor);
	}
*/
	

