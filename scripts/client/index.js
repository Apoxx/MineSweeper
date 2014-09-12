require('traceur/bin/traceur-runtime')
import MineSweeperUI from './MineSweeperUI'
import MineSweeper from './MineSweeper'
import GameHistory from './GameHistory'

var element = document.getElementById('game')

var mineSweeper = new MineSweeper()

var mineSweeperUI = new MineSweeperUI(element, mineSweeper)

var restartBtn = document.getElementById('restart')
var saveBtn = document.getElementById('save')
var loadBtn = document.getElementById('load')

var lines = document.getElementById('lines')
var cols = document.getElementById('cols')
var mines = document.getElementById('mines')

var saveName = document.getElementById('saveName')

saveName.value = GameHistory.lastSave() || ''



restartBtn.addEventListener('click', () => mineSweeperUI.mineSweeper = new MineSweeper(lines.value,cols.value,mines.value))
saveBtn.addEventListener('click', () => mineSweeperUI.mineSweeper.save(saveName.value))
loadBtn.addEventListener('click', () => mineSweeperUI.mineSweeper = MineSweeper.load(saveName.value))
