require('traceur/bin/traceur-runtime')
import MineSweeperUI from './MineSweeperUI'

var element = document.getElementById('game');

var mineSweeper = new MineSweeperUI(element);