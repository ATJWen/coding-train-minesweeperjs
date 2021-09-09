function Cell(i, j, w){
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.neighbourCount = 0;
	this.revealed = false;
    this.bee = false;
    this.marked = false;
    this.correctlyMarked = 0;
    this.gameover = false;
}

Cell.prototype.show = function(){
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
        if(this.marked && this.bee && this.gameover){
            this.correctlyMarked = 1;
        }

        if(this.marked && !this.bee && this.gameover){
            this.correctlyMarked = -1;
        }
        if(this.marked && !this.bee && !this.gameover){
            this.placeMarker();
        }
        if(this.bee){
            stroke(0);
            fill(127);
            ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w * 0.5);
        } 
        if(!this.bee){
            this.marked = false;
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if(this.neighbourCount > 0){
                textAlign(CENTER);
                fill(0);
                text(this.neighbourCount, this.x + this.w*0.5, this.y + this.w - 6);
            }
        }
    }

    if(this.marked){
        stroke(0);
        fill(color(255, 204, 0));
        ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w * 0.5);
    }

    if(this.correctlyMarked === 1){
        stroke(0);
        fill(0,255,0);
        ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w * 0.5);
    }

    if(this.correctlyMarked === -1){
        stroke(0);
        fill(255,0,0);
        ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w * 0.5);
    }
}

Cell.prototype.contains = function(x,y){
    return(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);    
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if(this.neighbourCount == 0){
        //floodfill algorithm
        this.floodfill();
    }
}

Cell.prototype.floodfill = function(){
    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i > -1 && i < cols && j > -1 && j <rows){
                var neighbour = grid[i][j];
                if(!neighbour.bee && !neighbour.revealed && !neighbour.marked){
                    neighbour.reveal();
                }
            }

        }
    }
}

Cell.prototype.countBees = function(){
    var total = 0;

    if(this.bee){
        this.neighbourCount = -1;
        return;
    }

    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i > -1 && i < cols && j > -1 && j <rows){
                var neighbour = grid[i][j];
                if(neighbour.bee){
                    total++;
                }
            }
        }
    }

    this.neighbourCount = total;
}

Cell.prototype.placeMarker = function(){
    if(!this.revealed){
        if(!this.marked)
            {this.marked = true;}
        else
            {this.marked = false;}

    }
}