var {
	JSONLoader,
	WebGLRenderer,
	Scene,
	Camera,
	PointLight,
	MeshLambertMaterial,
	Mesh,
	PerspectiveCamera,
	ImageUtils,
	AmbientLight,
	Vector3,
	Projector,
	Raycaster

} = require('three')

import EntityFactory from './EntityFactory'
import Entity from './Entity'
import Animation from './Animation'
import Tween from '../utils/Tween'
import Position from '../Position'

var loader = new JSONLoader()

class MineSweeperUI3D {

	constructor(containerElement, mineSweeper) {
		this.mouse = {x : 0, y : 0}
		this.oldPos = new Vector3(0,0,0)
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
		this.projector = new Projector()
		this.raycaster = new Raycaster()
		this.renderer = new WebGLRenderer({
			antialias: true, // to get smoother output
			preserveDrawingBuffer: true // to allow screenshot
		})
		this.renderer.setSize(this.width, this.height)
		this._container.appendChild(this.renderer.domElement)

		this.scene = new Scene()

		// put a camera in the scene
		this.camera = new PerspectiveCamera(70, this.width / this.height, 1, 10000)
		this.camera.position.set(0, 0, 30)
		this.camera.rotation.set(0, 0, -1*Math.PI/2)
		this.scene.add(this.camera)
		//*
		var ambientLight = new AmbientLight(0x333333)
		this.scene.add(ambientLight)
		//*/

		this.pointLight = new PointLight(0xffffff, 1.75, 10)
		this.pointLight.position.set(0, 0, 2)
		this.pointLight.lookAt(this.scene.position)
		this.scene.add(this.pointLight)

		for(var i = 0; i < this._mineSweeper.lines; i++){
			this._board[i] = []
			for(var j = 0; j < this._mineSweeper.cols; j++){
				((i,j) => {
					this.entityFactory.create('cell', `cell[${i}][${j}]`).then(entity => {
					entity.rotation.x = 1
					entity.position.x = 6 - i * 2.1
					entity.position.y = 6 - j * 2.1
					entity.location = new Position(i, j)
					entity.play('levitate')
					this.scene.add(entity)
					this._board[i][j] = entity
					})	
				})(i,j)				
			}

		}
		this.renderer.domElement.addEventListener('click', event => {
			this.mouse.x = ( event.offsetX / 500 ) * 2 - 1
			this.mouse.y = - ( event.offsetY / 500 ) * 2 + 1

			var vector = new Vector3( this.mouse.x, this.mouse.y, 1 )
			this.projector.unprojectVector( vector, this.camera )
			this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() )
			var intersects = this.raycaster.intersectObjects( this.scene.children )
			if(intersects[0]){
				var object = intersects[0].object
				if(this._mineSweeper.sweep(object.location)) alert('You loose !')
				this.update()
				var tween = new Tween(this.oldPos, object.position, 200)
				tween.onUpdate = tween => {
					this.pointLight.position.set(tween.values.x,tween.values.y,tween.values.z+3)
				}
				tween.go()
			} 
			
		})

	}

	render() {
		this.renderer.render(this.scene, this.camera)
	}

	update(){
		var data = this._mineSweeper.renderData()
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				if(data[i][j] !== -1) this._board[i][j].flip(false); else this._board[i][j].flip(true)
			}
		}
	}

	animate() {
		var loop = (time) => {
			this.render()
			window.requestAnimationFrame(loop)
		}
		window.requestAnimationFrame(loop)
	}
}

export default MineSweeperUI3D