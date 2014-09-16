class Animation{
	constructor(name, flow){
		this.name = name
		this.flow = flow
	}

	play(entity, params){
		var result = this.flow.call(entity, params)
		if(result instanceof Promise) result.then((replay) => {
			if(replay) this.play(entity, params)
		})
		return result
	}
}

export default Animation