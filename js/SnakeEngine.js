function SnakeEngine (canvasWidth, canvasHeight) {
    
	this.music;
	this.numberOfCells = 40;
	this.initialFoodCount = 3;
	this.foods = [];
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.cellSize = canvasWidth / this.numberOfCells;
	this.gameOver = false;
	this.gameOverText;
	this.currentScore = 0;
	this.currentDirection = 'right';
				
	this.snake = new Snake(this.cellSize, canvasWidth, canvasHeight, this.numberOfCells / 4);
	
	this.init = function() {
	                
		this.gameOverText = null;
	
		for(var i=0;i<this.initialFoodCount;i++) {
			this.createRandomFood();
		}		
		
		this.music = new Audio("audio/music.mp3");
		this.music.loop = true;
		this.music.play();
	}
			
	this.update = function(currentDirection) {
		
		if(currentDirection == 'left' && this.currentDirection != 'right' ||
			currentDirection == 'up' && this.currentDirection != 'down' ||
			currentDirection == 'down' && this.currentDirection != 'up' ||
			currentDirection == 'right' && this.currentDirection != 'left') {
				
			this.currentDirection = currentDirection;	
		}
			
		this.checkDeadlyCollisions();
		
		this.snake.update(this.currentDirection);
					
		this.checkSnakeHitsFood();
		
		if(this.gameOver == false) {
			this.currentScore++;
		}		
	};
	
	this.checkDeadlyCollisions = function() {
		
		if(this.snake.collisionWithFrame(this.currentDirection) || 
				this.snake.collisionWithSelf(this.currentDirection)) {
			if(this.gameOver == false) {
				snd = new Audio("audio/bang2.mp3");
				snd.play();
				this.gameOver = true;
				this.snake.stop();									
				
				this.checkAndStoreHighScore();
				this.music.pause();
			}
		}
	}
	
	this.checkAndStoreHighScore = function() {
	
		if(this.currentScore > localStorage.highScore || localStorage.highScore == null) {
		
			localStorage.highScore = this.currentScore;
			var highScore = document.getElementById("highscore");		
			highScore.innerText = localStorage.highScore;		
		}
	}
	
	this.checkSnakeHitsFood = function() {
		
		for(var i=0;i<this.foods.length;i++)
		{
			var food = this.foods[i];
			
			if(this.snake.collisionWithFood(food)) {
				var snd = new Audio("audio/sound11.mp3");
				snd.play();
				this.snake.grow();
				this.currentScore += (this.snake.cells.length * this.snake.cells.length);
				this.foods.splice(i,1);			
				this.createRandomFood();
				break;
			}		
		}
	}
	
	this.draw = function(context) {
		
		this.drawFrame(context);
		this.snake.draw(context);
		this.drawFoods(context);	
		this.drawScore(context);
		
		if(this.gameOver) {
			if(this.gameOverText == null) {
				this.gameOverText = new GameOverText(this.canvasWidth, this.canvasHeight);
			}
			
			this.gameOverText.drawGameOver(context);
		}		
	};
	
	this.drawFoods = function(context) {
		for(var i=0;i<this.foods.length;i++) {
			var food = this.foods[i];
			food.draw(context);
		}
	}
		
	this.createRandomFood = function() {		
		
		do
		{
			var x = Math.round(Math.random() * (this.numberOfCells - 1));
			var y = Math.round(Math.random() * (this.numberOfCells - 1));
			var point = new Point(x,y);			
		}while(this.snake.intersectsWith(point) == true)
		
		this.foods.push(new Food(x, y, this.cellSize));		
	};
	
	this.drawFrame = function(context) {		
			
		var gradient = context.createLinearGradient(0,0,this.canvasWidth, this.canvasHeight);
		gradient.addColorStop(0,"#B2CCFF");
		gradient.addColorStop(1,"#8093B8");
		context.fillStyle=gradient;
				
		context.fillRect(0, 0, canvasWidth, canvasHeight);		
	}
	
	this.drawScore = function(context) {
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillStyle = 'black';
		context.font =  'italic 22px sans-serif';		
		context.fillText(this.currentScore, 10, 10);
	}
}

