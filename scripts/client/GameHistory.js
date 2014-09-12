import Position from './Position'

class GameHistory{
	constructor(name){
		if(!localStorage["minesweeper"]) localStorage["minesweeper"] = {}
		this.gameName = name
		this.idCount = 0
		this.moves = []
	}

	record(type, data, timestamp){
		this.moves.push({id: this.idCount++, timestamp, type, data})
	}

	save(){
		var data = {}
		data[this.gameName] = this.moves
		localStorage["minesweeper"] = JSON.stringify(data)
	}

	load(MineSweeper){
	  var data = JSON.parse(localStorage["minesweeper"])
	  this.moves = data[this.gameName]

	  var init = this.moves.filter(record => record.type === 'init')[0]['data']
	  //var init = [for(record of this.moves) if(record.type === 'init') record][0]['data']
	  var mineSweeper = new MineSweeper(init.lines, init.cols, init.mines, init.seed)

	  this.moves.forEach( move => {
	  	if(move.type === 'sweep') mineSweeper.sweep(new Position(move.data.x, move.data.y))
	  	if(move.type === 'mark') mineSweeper.mark(new Position(move.data.x, move.data.y))
	  })

	  mineSweeper.gameHistory = this

	  return mineSweeper
	}
}

export default GameHistory