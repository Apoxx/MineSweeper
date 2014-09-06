import MineSweeper from './MineSweeper';
import Position from './Position';

class MineSweeperUI{
	constructor(containerElement, mineSweeper){
		this.mineSweeper = mineSweeper || new MineSweeper();
		this._container = containerElement;
		this._board = [];
		this.createBoard();
	}

	createBoard(){
		for (var i = 0; i < this.mineSweeper.lines; i++) {
			this._board[i] = [];
			for (var j = 0; j < this.mineSweeper.cols; j++) {
				var button = document.createElement('BUTTON');
				button.x = i;
				button.y = j;
				button.className = 'cell';
				button.addEventListener('click', (event) => {
					event.preventDefault();
					console.log(event);
					if(this.mineSweeper.sweep(new Position(event.target.x, event.target.y))){
						alert('You loose !');
					}else{
						if(this.mineSweeper.isWin()) alert('You won !');
					}
					this.render();
				});
				button.addEventListener('contextmenu', (event) => {
					event.preventDefault();
					this.mineSweeper.mark(new Position(event.target.x, event.target.y));					
					this.render();
				});
				this._board[i][j] = button;	
				this._container.appendChild(button);
			}	
			this._container.appendChild(document.createElement('BR'));
		};
	}
	render(){
		var data = this.mineSweeper.renderDatas();
		for (var i = 0; i < this.mineSweeper.lines; i++) {
			for (var j = 0; j < this.mineSweeper.cols; j++) {
                this._board[i][j].disabled = false;
                if(data[i][j] === 0){
                	this._board[i][j].innerText = 'x';
                }else if(data[i][j] === -1){
					this._board[i][j].innerText = '.';
				}else if(data[i][j] === -2){					
					this._board[i][j].innerText = 'M';
				}else{
					this._board[i][j].innerText = data[i][j];
					this._board[i][j].disabled = true;
				}
			};
		};
	}
}

export default MineSweeperUI;