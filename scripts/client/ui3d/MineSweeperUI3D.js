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
import Entity from './Entity'
import Animation from './Animation'
import Tween from '../utils/Tween'
var loader = new JSONLoader()

class MineSweeperUI3D {

	constructor(containerElement, mineSweeper) {
		this.entityFactory = new EntityFactory('assets/models/')
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
		this.camera.position.set(0, 0, 20)
		this.scene.add(this.camera)

		var ambientLight = new AmbientLight(0xffffff);
		this.scene.add(ambientLight);
		//console.log(Animation)
		var anim = new Animation('levitate', function({value, time, counter = 0}){
			return new Promise(resolve => {
				var tween = new Tween(this.position, {y: value}, time)
				tween.go()
				var back = false
				tween.onComplete = () => {
					if(!back){
						tween.back()
						back = true
					}else {
						tween.reset()
						if(counter === 10) resolve()
						resolve({value, time, counter})
					}
				}
			})
		})

		;[1,2,3,4,5].forEach((val) => {
			this.entityFactory.create('cell', 'cell' + val).then(entity => {
				entity.addAnimation(anim, {value : 0.05 + Math.random()/10, time:  1000 + Math.random() * 1000})
				entity.position.x = -6 + (val * 2.1)
				entity.play('levitate', true)
				this.scene.add(entity)
			})
		})


	}

	render() {
		this.renderer.render(this.scene, this.camera)
	}

	animate() {
		var loop = (time) => {
			//this.scene.children.filter(child => child instanceof Entity).map(entity => entity.animate(time))
			this.render()
			window.requestAnimationFrame(loop)
		}
		window.requestAnimationFrame(loop)
	}
}

export default MineSweeperUI3D