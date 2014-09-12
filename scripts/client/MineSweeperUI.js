import MineSweeper from './MineSweeper'
import Position from './Position'

class MineSweeperUI{

	constructor(containerElement, mineSweeper){
		this._mineSweeper = mineSweeper || new MineSweeper()
		this._container = containerElement
		this._board = []
		this.createBoard()
	}

	set mineSweeper(mineSweeper){
		this._mineSweeper = mineSweeper
		this.createBoard()
		this.render()
	}

	get mineSweeper(){
		return this._mineSweeper
	}

	createBoard(){
		this._container.innerHTML = ''
		for (var i = 0; i < this._mineSweeper.lines; i++) {
			this._board[i] = []
			for (var j = 0; j < this._mineSweeper.cols; j++) {
				var button = document.createElement('BUTTON')
				button.x = i
				button.y = j
				button.className = 'cell'
				button.addEventListener('click', (event) => {
					event.preventDefault()
					if(this._mineSweeper.sweep(new Position(event.target.x, event.target.y))){
						alert('You loose !')
					}else{
						if(this._mineSweeper.isWin()) alert('You won !')
					}
					this.render()
				})
				button.addEventListener('contextmenu', (event) => {
					event.preventDefault()
					this._mineSweeper.mark(new Position(event.target.x, event.target.y))				
					this.render()
				})
				this._board[i][j] = button;	
				this._container.appendChild(button)
			}	
			this._container.appendChild(document.createElement('BR'))
		}
	}
	
	render(){
		var data = this._mineSweeper.renderDatas()
		for (var i = 0; i < this._mineSweeper.lines; i++) {
			for (var j = 0; j < this._mineSweeper.cols; j++) {
                this._board[i][j].disabled = false
                if(data[i][j] === 0){
                	this._board[i][j].innerHTML = 'x'
                }else if(data[i][j] === -1){
					this._board[i][j].innerHTML = '.'
				}else if(data[i][j] === -2){					
					this._board[i][j].innerHTML = 'M'
				}else{
					this._board[i][j].innerHTML = data[i][j]
					this._board[i][j].disabled = true
				}
			}
		}
	}
}

export default MineSweeperUI