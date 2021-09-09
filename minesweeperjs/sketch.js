function make2DArray(cols, rows){
	var arr = new Array(cols);
	for(var i = 0; i <arr.length; i++){
		arr[i] = new Array(rows);
	}

	return arr;
}

var grid;
var w = 20;
var cols;
var rows;
var totalBees = 50;
var totalCells = 40;

function setup() {
	createCanvas(totalCells*10 + 1 ,totalCells*10 +1);
	cols = floor(width/w);
	rows = floor(height/w);
	grid = make2DArray(cols,rows);
	for(var i = 0; i <cols; i++){
		for(var j = 0; j <rows; j++){
			grid[i][j] = new Cell(i, j, w);
		}
	}

	//pick totalBees spots

	var options = [];
	for(var i = 0; i <cols; i++){
		for(var j = 0; j <rows; j++){
			options.push([i, j]);
		}
	}

	for (var n = 0; n < totalBees; n++){
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		//Deletes that spot so it will no longer be an option
		options.splice(index, 1);
		grid[i][j].bee = true;
	}
	for(var i = 0; i <cols; i++){
		for(var j = 0; j <rows; j++){
			grid[i][j].countBees();
		}
	}
}

function gameOver(){
	for(var i = 0; i <cols; i++){
		for(var j = 0; j <rows; j++){
			grid[i][j].gameover = true;
			grid[i][j].revealed = true;			
		}
	}
}

function mousePressed() {
	for(var i = 0; i <cols; i++){
		for(var j = 0; j <rows; j++){
			if(grid[i][j].contains(mouseX, mouseY)){
				if(mouseButton === LEFT){
					grid[i][j].reveal();

					if(grid[i][j].bee){
						gameOver();
					}
				}

				else if(mouseButton === CENTER){
					grid[i][j].placeMarker();
				}
			}
		}
	}
}

function draw() {
	background(255);
	for(var i = 0; i <cols; i++){
		for(var j = 0; j <rows; j++){
			grid[i][j].show();
		}
	}
}
