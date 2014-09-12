require('traceur/bin/traceur-runtime')
import MineSweeperUI from './MineSweeperUI'
import MineSweeper from './MineSweeper'

var element = document.getElementById('game')

var mineSweeper = new MineSweeper(10,15,10)

var mineSweeperUI = new MineSweeperUI(element, mineSweeper)

var restartBtn = document.getElementById('restart')
var saveBtn = document.getElementById('save')
var loadBtn = document.getElementById('load')


restartBtn.addEventListener('click', () => mineSweeperUI.mineSweeper = new MineSweeper(20,20,50))
saveBtn.addEventListener('click', () => mineSweeperUI.mineSweeper.save('test'))
loadBtn.addEventListener('click', () => mineSweeperUI.mineSweeper = MineSweeper.load('test'))
