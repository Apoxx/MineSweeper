var {
	JSONLoader,
	WebGLRenderer,
	Scene,
	Camera,
	SpotLight,
	MeshLambertMaterial,
	Mesh,
	PerspectiveCamera,
	ImageUtils,
	AmbientLight
} = require('three')

import EntityFactory from './EntityFactory'

var loader = new JSONLoader()

class MineSweeperUI3D {

	constructor(containerElement, mineSweeper) {
		this.objLoader = new EntityFactory('assets/models/')
		this.width = 500
		this.height = 500
		this._mineSweeper = mineSweeper || new MineSweeper()
		this._container = containerElement
		this._board = []
		this.createBoard()
		this.render()
		this.animate()
	}

	createBoard() {
		this.renderer = new WebGLRenderer({
			antialias: true, // to get smoother output
			preserveDrawingBuffer: true // to allow screenshot
		})
		this.renderer.setSize(this.width, this.height)
		this._container.appendChild(this.renderer.domElement)

		this.scene = new Scene()

		// put a camera in the scene
		this.camera = new PerspectiveCamera(35, this.width / this.height, 1, 10000)
		this.camera.position.set(0, 0, 5)
		this.scene.add(this.camera)

		/*this.spotLight = new SpotLight( 0xffffff );
		this.spotLight.position.set(0, 0, 5)
		this.spotLight.intensity = 2
		this.scene.add( this.spotLight );*/

		var ambientLight = new AmbientLight(0xffffff);
		this.scene.add(ambientLight);

		this.objLoader.create('cell').then(mesh => this.scene.add(mesh))
		/*loader.load('assets/models/cell.js', geometry => {
        	var material = new MeshLambertMaterial({map : ImageUtils.loadTexture('assets/models/cell.png')})
        	var mesh = new Mesh(geometry, material)
			console.log(mesh)
        	this.scene.add(mesh)
        })*/


	}

	render() {
		this.renderer.render(this.scene, this.camera)
	}

	animate() {
		var last = 0
		var loop = (time) => {
			this.render()
			last = time
			window.requestAnimationFrame(loop)
		}
		window.requestAnimationFrame(loop)
	}
}

export default MineSweeperUI3D