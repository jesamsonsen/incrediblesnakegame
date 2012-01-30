function Food(x, y, cellSize) {
	this.x = x;
	this.y = y;
	this.cellSize = cellSize;
	this.minFoodScale = 0.5;
	this.currentFoodScale = this.minFoodScale;
	this.maxFoodScale = 1;
	this.scalingUp = true;
		
    this.draw = function(context) {		
						
		context.save();
		context.translate(this.x * this.cellSize, this.y * this.cellSize);
		
		var cellCenterPos = this.cellSize / 2;
		context.translate(cellCenterPos, cellCenterPos);
		context.scale(this.currentFoodScale, this.currentFoodScale);
		context.translate(-cellCenterPos, -cellCenterPos);
		
		context.fillStyle   = 'red';
		context.strokeStyle = 'black';
				
		context.lineWidth = 2;		 
		context.beginPath();
		context.arc(this.cellSize / 2, this.cellSize / 2, this.cellSize / 2, 0, Math.PI*2, true);
		context.closePath();
		context.fill();	
		context.stroke();
		
		context.restore();
		
		if(this.scalingUp) {		
			this.currentFoodScale += 0.05;
			if(this.currentFoodScale >= this.maxFoodScale) {
				this.scalingUp = false;
			}
		}		
		else {
			this.currentFoodScale -= 0.05;
			if(this.currentFoodScale <= this.minFoodScale) {
				this.scalingUp = true;
			}
		}		
	};
}