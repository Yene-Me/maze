import Hex from '../HexMaze/Hex';
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');



export default class HexMazeGenerator {

    constructor(row,col, size,paddingX, paddingY) {
        this._hexGrid = [];
        this._row = row;
        this._col = col;
        this._grid = col*row;
        this._size = size;
        this._offsetX = size*paddingX;
        this._offsetY = size*paddingY;
    }

    createHexGrid() {

        for (var index = 0; index < this._grid; index++) {
            this._hexGrid.push(new Hex(this._size, 0, 0));
        }
    }

    getHexGrid()
    {
        return this._hexGrid;
    }


    drawHexGrid(pointX, pointY) {
        for (var y = 0; y < this._row; y++) {
            for (var x = 0; x < this._col; x++) {
                this._hexGrid[y].hexData();
                this._hexGrid[y].drawHex(context, pointX + (x*this._offsetX)+(this._size), pointY + (y*this._offsetY)+(this._size*2));
            }
        }
    }
}




















