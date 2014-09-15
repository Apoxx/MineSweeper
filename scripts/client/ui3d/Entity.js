var {
	Mesh
} = require('three')

import {merge} from '../utils/ToolBox'

class Entity extends Mesh {
	constructor(name, geometry, material) {
		Mesh.call(this, geometry, material)
		this.name = name
		this.rotation.x = 0.7
		this.animations = {}
		this.currentAnimation = null
	}

	addAnimation(anim, defaults){
		this.animations[anim.name] = {anim, defaults}
	}

	play(name, loop, params){
		return this.animations[name].anim.play(this, loop, merge(this.animations[name].defaults, params))
	}
}

export default Entity