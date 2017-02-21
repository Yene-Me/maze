import Hex from '../HexMaze/Hex';
import * as THREE from 'three';
import Detector from 'Detector';

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');



export default class HexMazeGenerator {

    constructor() {

    }

    createHexGrid(num) {
        let hexGrid = [];
        for (var index = 0; index < num; index++) {
            hexGrid.push(new Hex(5, 0, 0));
        }
        return hexGrid;
    }


    drawHexGrid(num, pointx, pointy, hexGrid) {
        for (var y = 0; y < hexGrid.length; y++) {
            for (var x = 0; x < num; x++) {
                hexGrid[y].hexData();
                hexGrid[y].drawHex(context, pointx + (x * 40), pointy + (y * 45));
            }
        }
    }
}




















