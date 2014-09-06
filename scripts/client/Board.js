import Position from './Position';
import Cell from './Cell'

class Board{
	constructor(lines, cols){
		this.lines = lines;
		this.cols = cols;
		this._board = [];
		this._generate();
	}
	addMine(position){
		if(this.isEmpty(position)){
			this._board[position.x][position.y].mine = true;
			return true;
		}else{
			return false;
		}
	}
	getMine(position){
		return this._board[position.x][position.y].mine;
	}
	isEmpty(position){
		return !this.getMine(position);
	}
	addRandomMines(mines, excluded){
		while(mines > 0){
			var pos = Position.random(this._board.length, this._board[0].length);
			if(pos && !pos.equals(excluded) && this.addMine(pos)) mines--;
		}
		this._findMinesAround();
	}
	getCell(positon){
		if(this._board[positon.x]){
			if(this._board[positon.x][positon.y]){
				return this._board[positon.x][positon.y];
			}
		}
		return null;
	}
	checkCell(position){
		var cell = this._revealCell(position);
		if(cell.mine) return true;
		return false;
	}
	toggleMarkCell(position){
		return this._board[position.x][position.y].marked = !this._board[position.x][position.y].marked;
	}
	_revealCell(position){
		var cell = this.getCell(position);
		if(cell && !cell.revealed){				
			cell.revealed = true;
			if(cell.minesAround === 0){		
				this._revealCell(new Position(position.x-1, position.y-1));
				this._revealCell(new Position(position.x-1, position.y));
				this._revealCell(new Position(position.x-1, position.y+1));
				this._revealCell(new Position(position.x, position.y-1));
				this._revealCell(new Position(position.x, position.y+1));
				this._revealCell(new Position(position.x+1, position.y-1));
				this._revealCell(new Position(position.x+1, position.y));
				this._revealCell(new Position(position.x+1, position.y+1));
			}
		}
		return cell;
	}
	_generate(){
		for(var i = 0; i < this.lines; i++){
			this._board[i] = [];
			for(var j = 0; j < this.cols; j++){
				this._board[i][j] = new Cell();
			}
		}
	}
	_findMinesAround(){
		for(var i = 0; i < this.lines; i++){
			for(var j = 0; j < this.cols; j++){
				var minesAround = 0;
				if((this.getCell(new Position(i-1,j-1)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i-1,j)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i-1,j+1)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i,j-1)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i,j+1)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i+1,j-1)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i+1,j)) || {}).mine) minesAround++;
				if((this.getCell(new Position(i+1,j+1)) || {}).mine) minesAround++;
				this._board[i][j].minesAround = minesAround;
			}
		}
	}
	isCompleted(){
		var counter = 0;
		for(var line of this._board){
			for(var cell of line){
				if(cell.mine || cell.revealed) counter++;
			}
		}
		return counter === this._board.length * this._board[0].length;
	}

	//TODO: Rewrite based on getPlayerView.
	getPlayerViewString(){
		var repr = '';
		for(var i = 0 ; i < this._board.length ; i++){
			for(var j = 0 ; j < this._board[0].length ; j++){
				if(this._board[i][j].revealed) repr += `${this._board[i][j].minesAround} `;
				else repr += '. ';
			}
			repr += '\n';
		}
		return repr;
	}
	getPlayerView(){
		var result = [];
		for(var i = 0 ; i < this._board.length ; i++){
			result[i] = [];
			for(var j = 0 ; j < this._board[0].length ; j++){
				if(this._board[i][j].revealed) result[i][j] = this._board[i][j].minesAround;
				else result[i][j] = this._board[i][j].marked ? -2 : -1;
			}
		}
		return result;
	}
}

export default Board;