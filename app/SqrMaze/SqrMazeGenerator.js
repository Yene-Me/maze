import  Cell from './Cell';
import PathFinder from "../astar_algorithm/PathFinder";


let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let w = 30;
let h = 30;
let canvasSize = Math.floor(800 / w);
let grids = [];
let stack = [];


let player = {
    x: 20*w,
    y: 20*w,
    size: w
};

let path = [];
let stepSize = player.size;
let id = 0;


export default class SqrMazeGenerator {
    constructor() {

    }
    
    createCell() {

        for (let x = 0; x < canvasSize; x++) {

            for (let y = 0; y < canvasSize; y++) {

                grids.push(new Cell(id, x, y, w, h, canvasSize));
                id++;
            }
        }

        console.log(grids.length)
    }

    

    createMaze() {
        let currentCell = grids[0];
        let next = null;
        let counter = 0;

        do {
            counter++;
            context.clearRect(0, 0, 290, 290);
            currentCell.vistCount++;
            if(  currentCell.vistCount > 2)
            {
                currentCell.visited = true;
            }

            next = currentCell.checkNeighbors(grids);

            if (next) {

                next.vistCount++;
                if(  next.vistCount > 2)
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
            //drawMaze();
            if (stack.length == 0) {
                let cellData = [];
                /* for (let cell in grids) {
                 cellData.push({
                 id: cell,
                 x: grids[cell].startPoint.x,
                 y: grids[cell].startPoint.y,
                 walls: grids[cell]["wallStatus"]
                 })
                 }*/

            }

        } while (stack.length != 0);


        let item = new PathFinder(canvasSize, grids);
        item.findEachNeighbours();

        let pathLastStop = item.findPath(0, 0, 20, 20);
        this.buildPath(pathLastStop);
        this.drawMaze();
    }

    
    buildPath(current) {

        path.push(current);
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
            a.wallStatus[1] = false;
            b.wallStatus[3] = false;
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
            context.rect(player.x, player.y, player.size, player.size);
            context.fillStyle = 'red';
            context.fill();
           // context.stroke();
            context.closePath();


           /* context.rect(1 * player.size, 10 * player.size, player.size, player.size);
            context.fillStyle = '#000';
            context.fill();
            context.stroke();
            context.closePath();*/

            /* context.rect(2*player.size, 10*player.size, player.size, player.size);
             context.fillStyle = '#000';
             context.fill();
             context.stroke();
             context.closePath();*/




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


            context.fillStyle = 'green';
            context.strokeStyle = 'pink';
            context.fill();
            context.stroke();
            context.moveTo(item.startPoint.x, item.startPoint.y);
            context.fillText(item.id, item.startPoint.y + 5, item.startPoint.x + 15);
            //North
            if (item.wallStatus[0]) {
                context.lineTo(item.walls.north.x, item.walls.north.y);
            }

           // context.closePath();

            context.moveTo(item.walls.north.x, item.walls.north.y);
            if (item.wallStatus[1]) {
                context.lineTo(item.walls.west.x, item.walls.west.y);
            }

           // context.closePath();

            context.moveTo(item.walls.west.x, item.walls.west.y);
            if (item.wallStatus[2]) {
                context.lineTo(item.walls.south.x, item.walls.south.y);
            }

            //context.closePath();

            context.moveTo(item.walls.south.x, item.walls.south.y);
            if (item.wallStatus[3]) {
                context.lineTo(item.walls.east.x, item.walls.east.y);
            }



            context.stroke();
        }
        //window.requestAnimationFrame(drawMaze);

    }

   
    startAI()
    {
        let   counter = 0;
        path.reverse();
        let id = setInterval(function () {

            let cell = path[counter];
            if (path.length > counter) {
                player.y = (cell.y) * stepSize;
                player.x = (cell.x) * stepSize;
                //drawMaze();
                //context.clearRect(0, 0, 800, 800);
                context.beginPath();
                context.rect(player.x + 10, player.y + 10, player.size - 20, player.size - 20);

                context.closePath();
                context.fillStyle = 'red';
                context.fill();
                //context.stroke();
                counter++;

            } else {
                clearInterval(id);
            }


        }, 1);
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




