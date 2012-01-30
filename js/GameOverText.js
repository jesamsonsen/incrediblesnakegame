function GameOverText(canvasWidth, canvasHeight) {							
	
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.startFontSize = 0;
	this.flyInSpeed = 5;
	this.bounceSpeed = 1;
	this.endFontSize = 70;
	this.currentFontSize = 0;
	this.growingText = true;
	
	this.drawGameOver = function(context) {						
		
		var text = 'GAME OVER';
		
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = 'red';
		context.strokeStyle = 'black';
		context.lineWidth = 4;
		context.font =  this.currentFontSize + 'px Arial Black, Gadget, sans-serif';	
		context.strokeText(text, this.canvasWidth / 2, this.canvasHeight / 2);		
		context.fillText(text, this.canvasWidth / 2, this.canvasHeight / 2);		
		
		if(this.growingText) {
			this.currentFontSize += this.flyInSpeed;
			if(this.currentFontSize >= this.endFontSize) {
				this.growingText = false;
			}
		}
		else {
			this.currentFontSize -= this.bounceSpeed;
			if(this.currentFontSize <= 60) {
				this.growingText = true;
			}
		}		
	}
}