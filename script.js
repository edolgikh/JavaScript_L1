var canvas = document.querySelector('#canv');
var ctx = canvas.getContext('2d');

var xCoord = document.getElementById('xCoord');
var yCoord = document.getElementById('yCoord');

var getCoordinates = function (evt) {
	let arr = {};
	let x = evt.offsetX;
	let y = evt.offsetY;

	xCoord.innerText = x;
	yCoord.innerText = y;
};

var system = {
	currentTool : '',
	currentColor : document.querySelector('#color'),
	brushSize : 5
};

var renderSystem = function (obj, elem, action) { 
	//obj -> change
	obj[elem] = action; 
	//console.log(system);
};

var switchTool = function (el) {
	if (el.id == 'brush') {
		//console.log ('brush');
		return 'brush'
	} else if (el.id == 'eraser') {
		//console.log ('not brush');
		return 'eraser'
	} else if (el.id == 'clearall') {
		//console.log ('not brush');
		return 'clearall'
	} else if (el.id == 'line') {
		//console.log ('line');
		return 'line'
	}else if (el.id == 'square') {
		//console.log ('line');
		return 'square'
	}
};

var switchSizeColor = function (list) {
	return list.value
};


var clicker = function (evt) {
	if (evt.target.classList.contains('toolButton') == true) {
		//console.log (`Выбран инструмент ${evt.target.id}`);
		switchTool(evt.target);
		//console.log(system);
		renderSystem (system, 'currentTool', switchTool (evt.target));
	} else if (evt.target.id == 'sizeSelect') {
		
	} else if (evt.target.id == 'color') {
		//renderSystem (system, 'currentColor', switchSizeColor(evt.target));
		//console.log ("12");
	} 
};

var changecolor = function (evt) {
	renderSystem (system, 'currentColor', switchSizeColor(evt.target));
}

var changesize = function (evt) {
	renderSystem (system, 'brushSize', switchSizeColor(evt.target));
}

var startDraw = function (evt) {
	//зафиксировать нач коорд
	//начать процесс рисования
	if (system.currentTool == 'brush') {
		draw (evt); 
	} else if (system.currentTool == 'eraser') {
		eraser (evt); 
	} else if (system.currentTool == 'line') {
		drawline (evt); 
	} else if (system.currentTool == 'square') {
		drawsquare (evt); 
	}
	
};

var endDraw = function (evt) {
	canvas.onmousemove = null;
};

var draw = function (evt) {
	ctx.beginPath();
	canvas.onmousemove = function (evt) {
		ctx.fillStyle = system.currentColor;
		ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
	}
	ctx.closePath(); 
};

var clearall = function (evt) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var eraser = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
	}
}

var drawline = function (evt) {
	ctx.beginPath();
	ctx.moveTo (xCoord.innerText, yCoord.innerText);

	canvas.onclick = function () {
		let x=event.offsetX;
		let y=event.offsetY;
		ctx.lineTo(x, y); //рисуем линию
		ctx.strokeStyle  = system.currentColor;
		ctx.lineWidth = system.brushSize;
		ctx.stroke();
	}
	ctx.closePath(); 
};

var drawsquare = function (evt) {
	ctx.beginPath();
	let x=xCoord.innerText;
	let y=yCoord.innerText;

	canvas.onclick = function () {
		let w = event.offsetX - x;
		let h = event.offsetY - y;
		ctx.strokeStyle  = system.currentColor;
		ctx.lineWidth = system.brushSize;
		ctx.strokeRect(x, y, w, h);
	}
	ctx.closePath(); 
};

canvas.addEventListener ('mousemove', getCoordinates);
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);
document.querySelector('#color').addEventListener('change', changecolor);
document.querySelector('#sizeSelect').addEventListener('change', changesize);
document.querySelector('#clearall').addEventListener('click', clearall);

window.addEventListener ('click', clicker);




//ctx.fillRect (x0, y0, width(px), height(px));

// ctx.fillRect (0, 0, 100, 100);

// ctx.fillStyle = 'white';
// ctx.fillRect (50, 50, 100, 100);

//ctx.fillStyle = '#7700ff';
//ctx.fillRect (200, 200, 100, 100);

// ctx.beginPath();
// ctx.strokeStyle = 'red';
// ctx.fillStyle = 'blue';

// ctx.moveTo (100, 100);
// ctx.lineTo (300, 300);
// ctx.moveTo (100, 100);
// ctx.lineTo (300, 100);
// ctx.moveTo (300, 100);
// ctx.lineTo (300, 300);

// ctx.rect (40,100, 50, 50);
// ctx.fill ();
// ctx.stroke ();



//canvas.addEventListener ('click', function (evt) {console.log (evt)} );



