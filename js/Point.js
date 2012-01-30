function Point(x, y, direction) {
	this.x = x;
	this.y = y;
	this.direction = direction;
	
	this.intersects = function(point) {
	
		if(this.x == point.x && this.y == point.y) {
			return true;
		}
		
		return false;
	}
}