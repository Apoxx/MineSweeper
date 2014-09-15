class Animation{
	constructor(name, flow){
		this.name = name
		this.flow = flow
	}

	play(entity, loop, params){
		var result = this.flow.call(entity, params)
		if(loop && result instanceof Promise) result.then((newParams) => {
			if(!newParams || newParams instanceof Object) this.play(entity, loop, newParams || params)
		})
		return result
	}
}

export default Animation