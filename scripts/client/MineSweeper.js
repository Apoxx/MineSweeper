import Board from './Board';
import Position from './Position'

class MineSweeper{
	constructor(lines, cols, mines){
		if(mines > lines * cols) mines = lines * cols;
		this._lines = lines;
		this._cols = cols;
		this._mines = mines;

	}
	start(){
		console.log(this.sweep(new Position(1,1)));
		console.log(this._board.getPlayerView());
	}
	mark(position){
	}
	sweep(position){
		if(!this._board){			
			this.createNewGame();
			while(this._board.getCell(position).minesAround > 0){
				this.createNewGame();
			}
		}
		var tmp = this._board.checkCell(position);
		console.log(this._board.getPlayerView());		
		console.log(this._board.isCompleted());
		return tmp;
	}
	createNewGame(lines, cols, mines){		
		this._board = new Board(this._lines, this._cols);
		this._board.addRandomMines(this._mines);
	}
}

export default MineSweeper;