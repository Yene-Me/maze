import  Cell from './Cell';

import Hex from './Hex';
import * as THREE from 'three'
import Detector from 'Detector';
import PathFinder from "./PathFinder";
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var x = 0;
var y = 0;
//var col = 20;

var w = 30;
var h = 30;

var canvasSize = Math.floor(800 / w);

var hexGrid = [];


var grids = [];


var stack = [];
var id = 0;

var player = {
    x: 10*w,
    y: 10*w,
    size: w
};

var path = [];

var stepSize = player.size;

var cellCollection;

createCell();
createMaze();
//drawMaze();
//createHexGrid(2);
//drawHexGrid(15);


function createCell() {

    for (var x = 0; x < canvasSize; x++) {

        for (var y = 0; y < canvasSize; y++) {

            grids.push(new Cell(id, x, y, w, h, canvasSize));
            id++;
        }
    }

    console.log(grids.length)
}


/*function createHexGrid(num) {
 for (var index = 0; index < num; index++) {
 hexGrid.push(new Hex(20, 0, 0));
 }


 }

 function drawHexGrid(num) {
 for (var y = 0; y < num; y++) {
 for (var x = 0; x < num; x++) {
 hexGrid[y].hexData();
 if (x % 2) {
 hexGrid[y].drawHex(context, 100 + (x * 40), 120 + (y * 45));
 } else {
 hexGrid[y].drawHex(context, 100 + (x * 40), 100 + (y * 45));
 }

 }
 }
 }*/

function getListGCost(a, b) {
    return a.GCost - b.GCost;
}

function createMaze() {
    var currentCell = grids[0];
    var next = null;
    var counter = 0;

    do {
        counter++;
        context.clearRect(0, 0, 290, 290);

        currentCell.visited = true;

        next = currentCell.checkNeighbors(grids);

        if (next) {

            next.visited = true;

            // STEP 2
            stack.push(currentCell);

            // STEP 3
            removeWalls(currentCell, next);
            //removeWalls(currentCell, next);

            // STEP 4
            currentCell = next;

        } else if (stack.length > 0) {
            currentCell = stack.pop();
        }
        //drawMaze();
        if (stack.length == 0) {
            var cellData = [];
            /* for (var cell in grids) {
             cellData.push({
             id: cell,
             x: grids[cell].startPoint.x,
             y: grids[cell].startPoint.y,
             walls: grids[cell]["wallStatus"]
             })
             }*/

        }

    } while (stack.length != 0);


    var item = new PathFinder(canvasSize, grids);
    item.findEachNeighbours();

    var pathLastStop = item.findPath(10,5,1,10);
    buildPath(pathLastStop);
    drawMaze();
}

function buildPath(current) {

    path.push(current);
    if (current.previous) {
        buildPath(current.previous)
    }
}


function removeWalls(a, b) {
    var x = a.x - b.x;
    if (x === 1) {
        a.wallStatus[3] = false;
        b.wallStatus[1] = false;
    } else if (x === -1) {
        a.wallStatus[1] = false;
        b.wallStatus[3] = false;
    }
    var y = a.y - b.y;
    if (y === 1) {
        a.wallStatus[0] = false;
        b.wallStatus[2] = false;
    } else if (y === -1) {
        a.wallStatus[2] = false;
        b.wallStatus[0] = false;
    }
}


function drawMaze() {
    context.clearRect(0, 0, 800, 800);
    for (var cell in grids) {


        var item = grids[cell];

        context.beginPath();
        context.rect(player.x, player.y, player.size, player.size);
        context.fillStyle = 'red';
        context.fill();
        context.stroke();
        context.closePath();



        context.rect(1*player.size, 10*player.size, player.size, player.size);
        context.fillStyle = '#000';
        context.fill();
        context.stroke();
        context.closePath();

       /* context.rect(2*player.size, 10*player.size, player.size, player.size);
        context.fillStyle = '#000';
        context.fill();
        context.stroke();
        context.closePath();*/


        context.fillStyle = 'green';
        context.fill();
        //context.stroke();
        context.moveTo(item.startPoint.x, item.startPoint.y);
        context.fillText(item.id, item.startPoint.y + 5, item.startPoint.x + 15);

        context.closePath();
     /*   context.fillStyle = 'green';
        context.fill();
        context.stroke();*/

        //context.fillText("H:" + item.HCost, item.startPoint.y + 5, item.startPoint.x + 40);


      /*  context.closePath();
        context.fillStyle = 'black';
        context.fill();
        context.stroke();*/

        //context.fillText("G:" + item.GCost, item.startPoint.y + 40, item.startPoint.x + 40);


       /* context.closePath();
        context.fillStyle = 'black';
        context.fill();
        context.stroke();*/

        //context.fillText("F:" + item.FCost, item.startPoint.y + 40, item.startPoint.x + 15);


        //North
        if (item.wallStatus[0]) {
            context.lineTo(item.walls.north.x, item.walls.north.y);
        }

        context.closePath();

        context.moveTo(item.walls.north.x, item.walls.north.y);
        if (item.wallStatus[1]) {
            context.lineTo(item.walls.west.x, item.walls.west.y);
        }

        context.closePath();

        context.moveTo(item.walls.west.x, item.walls.west.y);
        if (item.wallStatus[2]) {
            context.lineTo(item.walls.south.x, item.walls.south.y);
        }

        context.closePath();

        context.moveTo(item.walls.south.x, item.walls.south.y);
        if (item.wallStatus[3]) {
            context.lineTo(item.walls.east.x, item.walls.east.y);
        }
        context.closePath();
        context.fillStyle = 'red';
        //context.fill();
        context.stroke();
    }
    //window.requestAnimationFrame(drawMaze);

}
var counter = 0;
path.reverse();

console.log("path" ,path[0]);
var id = setInterval(function () {
 
    var cell = path[counter];
    if (path.length > counter) {
        player.y = (cell.y)* stepSize;
        player.x = (cell.x)* stepSize;
        //drawMaze();
        //context.clearRect(0, 0, 800, 800);
        context.beginPath();
        context.rect(player.x+10, player.y+10, player.size-20, player.size-20);

        context.closePath();
        context.fillStyle = 'red';
        context.fill();
        //context.stroke();
        counter++;

    }else {
        clearInterval(id);
    }


}, 50);

document.addEventListener("keydown", function (e) {


    switch (e.which) {

        case 38:
            console.log("up");
            player.y -= stepSize;
            break;
        case 40:
            console.log("down");
            player.y += stepSize;
            break;
        case 37:
            console.log("left");
            player.x -= stepSize;
            break;
        case 39:
            console.log("right");
            player.x += stepSize;
            break;
    }

});




