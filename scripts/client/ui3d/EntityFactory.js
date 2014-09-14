import Entity from './Entity'

var {
	JSONLoader,
	MeshLambertMaterial,
	ImageUtils
} = require('three')

class EntityFactory {
	constructor(base) {
		this.base = base
		this.loader = new JSONLoader()
		this.objs = {}
	}

	create(name) {
		return new Promise((resolve) => {
			this.loader.load(`${this.base}${name}.js`, geometry => {				
				var material = new MeshLambertMaterial({
					map: ImageUtils.loadTexture(`${this.base}${name}.png`)
				})
				var obj = new Entity(geometry, material)
				this.objs.name = obj
				resolve(obj)
			})
		})
	}
}

export default EntityFactory