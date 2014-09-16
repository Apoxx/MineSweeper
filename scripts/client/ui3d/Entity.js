var {
	Mesh
} = require('three')

import {merge} from '../utils/ToolBox'

class Entity extends Mesh {
	constructor(name, geometry, material) {
		Mesh.call(this, geometry, material)
		this.name = name
		this.animations = {}
	}

	addAnimation(anim, defaults){
		this.animations[anim.name] = {anim, defaults}
	}

	play(name, params){
		return this.animations[name].anim.play(this, merge(this.animations[name].defaults, params))
	}
}

export default Entity