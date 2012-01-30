function Snake(cellSize, canvasWidth, canvasHeight, snakeLength) {

	this.growLength = 5;
	this.remainingGrow = 0;
	this.snakeInitialVerticalPosition = (canvasWidth / cellSize) / 2;
	this.rightBorder = (canvasWidth / cellSize) - 1;
	this.bottomBorder = (canvasWidth / cellSize) - 1;
	this.stopped = false;
	this.cellSize = cellSize;
	this.cells = [];
	
	for(var i=snakeLength;i>0;i--) {
		this.cells.push(new Point(i, this.snakeInitialVerticalPosition, 'right'));
	}	
		    		
	this.update = function(currentDirection) {
						
		if(this.stopped)
			return;
		
		var point = this.getNextHeadPosition(currentDirection);
		this.cells.unshift(point);
		
		if(this.remainingGrow == 0) {
			this.cells.pop();
		}
		else {
			this.remainingGrow--;
		}
		
		this.growFlag = false;
	};
	
	this.getNextHeadPosition = function(currentDirection) {
		
		var nextHeadPos = Object.create(this.cells[0]);
		nextHeadPos.direction = currentDirection;
		
		if(currentDirection === 'left') {
			nextHeadPos.x -= 1;			
		}		
		else if(currentDirection === 'right') {
			nextHeadPos.x += 1;
		}		
		else if(currentDirection === 'up') {
			nextHeadPos.y -= 1;
		}
		else if(currentDirection === 'down') {
			nextHeadPos.y += 1;
		}
		
		return nextHeadPos;
	}
	
	this.draw = function(context) {		
						
		this.drawHeadCell(context, this.cells[0]);
		
		for(var i=1;i<this.cells.length;i++) {
			var cell = this.cells[i];		
			
			this.drawBodyCell(context, cell);
		}	
	}
	
	this.drawBodyCell = function(context, cell) {
		
		context.fillStyle   = '#FF9900';
		context.strokeStyle = '#009900';
		context.lineWidth = 2;
				
		this.drawCell(context, cell);		
	}
	
	this.drawCell = function(context, cell) {
		if(cell.direction == 'left') {
			this.drawRotatedCell(context, cell, 3.1415927);
		}			
		else if(cell.direction == 'right') {
			this.drawRotatedCell(context, cell, 0);
		}			
		else if(cell.direction == 'up') {
			this.drawRotatedCell(context, cell, 4.712389);
		}	
		else if(cell.direction == 'down') {
			this.drawRotatedCell(context, cell, 1.5707964);
		}				
	}
	
	this.drawRotatedCell = function(context, cell, rotation) {
						
		context.save();		
		context.translate(cell.x * this.cellSize, cell.y * this.cellSize);
	
		var cellCenterPos = this.cellSize / 2;
		context.translate(cellCenterPos, cellCenterPos);
		context.rotate(rotation);
		context.translate(-cellCenterPos, -cellCenterPos);
	
		context.beginPath();		
		context.moveTo(0,0);
		context.lineTo(this.cellSize, cellCenterPos);
		context.lineTo(0,this.cellSize);
		context.lineTo(0,0);
		
		context.fill();
		context.stroke();
		context.closePath();
		
		context.restore();
	}
	
	this.drawHeadCell = function(context, cell) {
		context.fillStyle   = '#009900';
		context.strokeStyle = '#FF9900';
		context.lineWidth = 2;
				
		this.drawCell(context, cell);		
	}
	
	this.collisionWithFrame = function(currentDirection) {
		var head = this.getNextHeadPosition(currentDirection);
		
		if(head.x < 0 || head.y < 0) {
			return true;	
		}
		
		if(head.x > this.rightBorder || head.y > this.bottomBorder) {
			return true;	
		}
			
		return false;
	}
	
	this.collisionWithSelf = function(currentDirection) {
		var head = this.getNextHeadPosition(currentDirection);
		
		for(var i=1; i<this.cells.length;i++)
		{
			var bodyCell = this.cells[i];
			if(head.intersects(bodyCell)) {
				return true;	
			}		
		}
		
		return false;
	}
	
	this.collisionWithFood = function(food) {
		var head = this.cells[0];
		if(head.intersects(food)) {
			return true;
		}
		
		return false;
	}
	
	this.intersectsWith = function(cell) {
		for(var i=0; i< this.cells.length;i++)
		{
			var snakeCell = this.cells[i];
			if(cell.intersects(snakeCell)) {
				return true;	
			}		
		}
		
		return false;
	}
	
	this.grow = function () {
		this.remainingGrow += this.growLength;
	}
	
	this.stop = function () {
		this.stopped = true;
	}
}


