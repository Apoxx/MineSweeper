import Position from './Position'

class GameHistory{
	constructor(name){
		this.gameName = name
		this.idCount = 0
		this.moves = []
		this.data = {}
		this._read()
	}

	record(type, data, timestamp){
		this.moves.push({id: this.idCount++, timestamp, type, data})
	}

	_read(){
		this.data = JSON.parse(localStorage['minesweeper'] || '{}') || {}
	}

	_write(){
		localStorage['minesweeper'] = JSON.stringify(this.data)
	}

	save(){
		this.data[this.gameName] = this.moves
		this.data.lastSave = this.gameName
		this._write()
	}
	static lastSave(){
		return JSON.parse(localStorage['minesweeper'] || '{}').lastSave
	}

	load(MineSweeper){
	  this.moves = this.data[this.gameName]
	  if(this.moves){

		  var init = this.moves.filter(record => record.type === 'init')[0]['data']
		  //var init = [for(record of this.moves) if(record.type === 'init') record][0]['data']
		  var mineSweeper = new MineSweeper(init.lines, init.cols, init.mines, init.seed)

		  this.moves.map( move => {
		  	if(move.type === 'sweep') mineSweeper.sweep(new Position(move.data.x, move.data.y))
		  	if(move.type === 'mark') mineSweeper.mark(new Position(move.data.x, move.data.y))
		  })

		  mineSweeper.gameHistory = this

		  return mineSweeper
		}
	}
}

export default GameHistory