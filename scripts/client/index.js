import MineSweeperUI3D from './ui3d/MineSweeperUI3D'
import MineSweeperUIDOM from './ui2d/MineSweeperUIDOM'
import MineSweeper from './MineSweeper'
import GameHistory from './GameHistory'

var game3d = document.getElementById('game3d')
var game2d = document.getElementById('game2d')

var mineSweeper = new MineSweeper()

var mineSweeperUI3D = new MineSweeperUI3D(game3d, mineSweeper)
var mineSweeperUIDOM = new MineSweeperUIDOM(game2d, mineSweeper)

var restartBtn = document.getElementById('restart')
var saveBtn = document.getElementById('save')
var loadBtn = document.getElementById('load')

var lines = document.getElementById('lines')
var cols = document.getElementById('cols')
var mines = document.getElementById('mines')

var saveName = document.getElementById('saveName')

saveName.value = GameHistory.lastSave() || ''



restartBtn.addEventListener('click', () => {
	mineSweeper = new MineSweeper(lines.value, cols.value, mines.value)
	mineSweeperUIDOM.mineSweeper = mineSweeper	
	mineSweeperUI3D.mineSweeper = mineSweeper
	})
saveBtn.addEventListener('click', () => mineSweeperUIDOM.mineSweeper.save(saveName.value))
loadBtn.addEventListener('click', () => mineSweeperUIDOM.mineSweeper = MineSweeper.load(saveName.value))