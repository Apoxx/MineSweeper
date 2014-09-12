import {Random} from './Utils'

var random = new Random()

class Position{

	constructor(x, y){
		this.x = x
		this.y = y
	}

	equals(position){
		return position.x === this.x && position.y === this.y
	}
	
	static random(maxX, maxY, rng){
		var x = Math.floor(rng.next() * maxX)
		var y = Math.floor(rng.next() * maxY)
		return new Position(x, y)
	}
}

export default Position