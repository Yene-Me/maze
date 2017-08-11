import  Cell from './Cell';
import PathFinder from "../astar_algorithm/PathFinder";


let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let w = 30;
let h = 30;
let canvasSize = Math.floor(500 / w);
let grids = [];
let stack = [];


let player = {
    x: 10*w,
    y: 10*w,
    size: w
};

let playerAI = {
    x: 10*w,
    y: 10*w,
    size: w
};

let path = [];
let stepSize = player.size;
let id = 0;



export default class SqrMazeGenerator {
    constructor() {
        this.pathOne = []
    }
    
    createCell() {

        for (let x = 0; x < canvasSize; x++) {

            for (let y = 0; y < canvasSize; y++) {

                grids.push(new Cell(id, x, y, w, h, canvasSize));
                id++;
            }
        }
    }

    

    createMaze() {
        let currentCell = grids[0];
        let next = null;
        let counter = 0;

        do {
            counter++;
            context.clearRect(0, 0, 290, 290);
            currentCell.vistCount++;
            if(  currentCell.vistCount > 3)
            {
                currentCell.visited = true;
            }

            next = currentCell.checkNeighbors(grids);

            if (next) {

                next.vistCount++;
                if(  next.vistCount > 3)
                {
                    next.visited = true;
                }

                // STEP 2
                stack.push(currentCell);

                // STEP 3
                this.removeWalls(currentCell, next);
                //removeWalls(currentCell, next);

                // STEP 4
                currentCell = next;

            } else if (stack.length > 0) {
                currentCell = stack.pop();
            }


        } while (stack.length != 0);


        let item = new PathFinder(canvasSize, grids);
        item.findEachNeighbours();

        let pathLastStop = item.findPath(0, 0, 10, 10);
        this.buildPath(pathLastStop);
        this.drawMaze();
    }

    
    buildPath(current) {

        this.pathOne.push(current);
        if (current.previous) {
            this.buildPath(current.previous)
        }
    }


    

    removeWalls(a, b) {
        let x = a.x - b.x;
        if (x === 1) {
            a.wallStatus[3] = false;
            b.wallStatus[1] = false;
        } else if (x === -1) {
            //a.wallStatus[1] = false;
            //b.wallStatus[3] = false;
        }
        let y = a.y - b.y;
        if (y === 1) {
            a.wallStatus[0] = false;
            b.wallStatus[2] = false;
        } else if (y === -1) {
            a.wallStatus[2] = false;
            b.wallStatus[0] = false;
        }
    }


    

    drawMaze() {
        context.clearRect(0, 0, 800, 800);
        for (let cell in grids) {


            let item = grids[cell];

            context.beginPath();
            context.fillStyle = 'red';
            context.fill();
            context.rect(player.x, player.y, player.size, player.size);
            context.closePath();


            context.beginPath();
            context.fillStyle = 'green';
            //context.strokeStyle = 'pink';
            context.fill();
            context.stroke();
            context.moveTo(item.startPoint.x, item.startPoint.y);


            //North
            if (item.wallStatus[0]) {
                context.lineTo(item.walls.north.x, item.walls.north.y);
            }

            context.moveTo(item.walls.north.x, item.walls.north.y);
            if (item.wallStatus[1]) {
                context.lineTo(item.walls.west.x, item.walls.west.y);
            }

            context.moveTo(item.walls.west.x, item.walls.west.y);
            if (item.wallStatus[2]) {
                context.lineTo(item.walls.south.x, item.walls.south.y);
            }

            context.moveTo(item.walls.south.x, item.walls.south.y);
            if (item.wallStatus[3]) {
                context.lineTo(item.walls.east.x, item.walls.east.y);
            }
            context.stroke();
        }
        //window.requestAnimationFrame(drawMaze);
    }

   
    startAI(bestPath)
    {
        let   counter = 0;
        bestPath.reverse();
        console.log(bestPath);
        let id = setInterval(function () {

            let cell = bestPath[counter];
            if (bestPath.length > counter) {
                playerAI.y = (cell.y) * stepSize;
                playerAI.x = (cell.x) * stepSize;

                context.beginPath();
                context.fillStyle = 'blue';
                context.rect(playerAI.x + 10, playerAI.y + 10, playerAI.size - 20, playerAI.size - 20);
                context.fill();
                context.closePath();

                context.beginPath();
                context.fillStyle = 'red';
                context.rect(player.x + 10, player.y + 10, player.size - 20, player.size - 20);
                context.fill();
                context.closePath();
                counter++;

            } else {
                clearInterval(id);
            }

        }, 300);
    }
    
}

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




