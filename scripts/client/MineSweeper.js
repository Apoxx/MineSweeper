import Board from './Board'
import Position from './Position'
import GameHistory from './GameHistory'
import {Random} from './Utils'

class MineSweeper{

	constructor(lines, cols, mines, seed){
		this.random = new Random(seed)
		this.gameHistory = new GameHistory()
		this.lines = lines || 10
		this.cols = cols || 10
		this._mines = mines || 10
		this._board = null
		this._firstSweep = true
		if(this._mines > this.lines * this.cols) this._mines = this.lines * this.cols;				
		this._board = new Board(this.lines, this.cols)
		this.gameHistory.record('init', {lines: this.lines, cols: this.cols, mines: this._mines, seed: this.random.seed}, Date.now())
	}

	static load(name){
		return (new GameHistory(name)).load(MineSweeper)
	}

	save(name){
		this.gameHistory.gameName = name
		this.gameHistory.save()
	}

	mark(position){
		this.gameHistory.record('mark', position, Date.now())
		this._board.toggleMarkCell(position)
	}

	sweep(position){
		if(this._firstSweep){			
			this._board.addRandomMines(this._mines, position, this.random)
			this._firstSweep = false
		}
		this.gameHistory.record('sweep', position, Date.now())
		return this._board.checkCell(position)
	}

	renderDatas(){
		console.log(this._board.getPlayerViewString())
		return this._board.getPlayerView()
	}

	isWin(){
		return this._board.isCompleted()
	}
}

export default MineSweeper