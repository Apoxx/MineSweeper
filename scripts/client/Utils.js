class Random{
	constructor(seed){
		this.seed = seed || Date.now()
	}
	next(){
		return this._random()
	}
	nextInt(){
		return Math.floor(this._random())
	}
	_random() {
    	var x = Math.sin(this.seed++) * 10000
    	return x - Math.floor(x)
	}

}

export {Random}