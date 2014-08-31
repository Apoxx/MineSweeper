class Position{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	static random(maxx, maxy){
		var x = Math.floor(Math.random() * maxx);
		var y = Math.floor(Math.random() * maxy);
		return new Position(x, y);
	}
}

export default Position;