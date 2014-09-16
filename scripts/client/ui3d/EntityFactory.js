import EntityCell from './EntityCell'

var {
	JSONLoader,
	MeshLambertMaterial,
	ImageUtils
} = require('three')

class EntityFactory {
	constructor(base) {
		this.base = base
		this.loader = new JSONLoader()
		this.models = {}
	}

	create(type, name) {
		return new Promise((resolve) => {
			if(this.models[type]) resolve(new EntityCell(name, this.models[type].geometry, this.models[type].material))
				else {
					this.loader.load(`${this.base}${type}.js`, geometry => {				
							var material = new MeshLambertMaterial({
								map: ImageUtils.loadTexture(`${this.base}${type}.png`)
							})
							this.models[type] = {geometry, material}
							var obj = new EntityCell(name, geometry, material)
							resolve(obj)
					})
				}
		})
	}
}

export default EntityFactory