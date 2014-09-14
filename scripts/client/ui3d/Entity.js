var {
	Mesh
} = require('three')

class Entity extends Mesh {
	constructor(geometry, material) {
		Mesh.call(this, geometry, material)
		this.rotation.x = 0.7
		//super(geometry, material)
		//Mesh.call(this, geometry, material)
	}
}

export default Entity