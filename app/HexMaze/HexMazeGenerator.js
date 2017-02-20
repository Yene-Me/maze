import Hex from '../HexMaze/Hex';
import * as THREE from 'three';
import Detector from 'Detector';

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let hexGrid = [];


export default class HexMazeGenerator {

    constructor() {

    }


    createHexGrid(num) {
        for (var index = 0; index < num; index++) {
            hexGrid.push(new Hex(20, 0, 0));
        }
    }


    drawHexGrid(num, pointx, pointy) {
        for (var y = 0; y < hexGrid.length; y++) {
            for (var x = 0; x < num; x++) {
                hexGrid[y].hexData();
                hexGrid[y].drawHex(context, pointx + (x * 40), pointy + (y * 45));
            }
        }
    }
}




















