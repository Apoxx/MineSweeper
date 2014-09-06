import Board from './Board';
import Position from './Position'

class MineSweeper{

	constructor(lines, cols, mines){
		this.lines = lines || 10;
		this.cols = cols || 10;
		this._mines = mines || 10;
		this._board = null;
		if(this._mines > this.lines * this.cols) this._mines = this.lines * this.cols;
	}

	mark(position){
		this._board.toggleMarkCell(position);
	}

	sweep(position){
		if(!this._board){			
			this.createNewGame();			
			this._board.addRandomMines(this._mines, position);
		}
		return this._board.checkCell(position);
	}

	createNewGame(){		
		this._board = new Board(this.lines, this.cols);
	}
	renderDatas(){
		return this._board.getPlayerView();
	}
	isWin(){
		return this._board.isCompleted();
	}
}

export default MineSweeper;