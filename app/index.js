import SqrMazeGenerator from './SqrMaze/SqrMazeGenerator';
import HexMazeGenerator from './HexMaze/HexMazeGenerator';
import Hex3D from './HexMaze/Hex3D';


/*let sqrMazeGenerator = new SqrMazeGenerator();

    sqrMazeGenerator.createCell();
    sqrMazeGenerator.createMaze();
    sqrMazeGenerator.startAI();*/

let hexMazeGenerator = new HexMazeGenerator();
    //hexMazeGenerator.createHexGrid(1);
    //hexMazeGenerator.drawHexGrid(9,100,120);
    //hexMazeGenerator.drawHexGrid(10,80,152);
    //hexMazeGenerator.drawHexGrid(9,100,185);

let hex3d = new Hex3D();

for(let index = 1 ; index < 11 ; index++)
{
    let hex1 = hex3d.init(hexMazeGenerator.createHexGrid(40), -40*index,0);
    let angle = hex1[index].myAngle;
        hex3d.animate(hex1, Math.cos(angle) * 400);
}

for(let index = 0 ; index < 11 ; index++)
{
    let hex1 = hex3d.init(hexMazeGenerator.createHexGrid(40), 40*index,0);
    let angle = hex1[index].myAngle;
    hex3d.animate(hex1, Math.cos(angle) * 400);
}




/*   let hex2 = hex3d.init(hexMazeGenerator.createHexGrid(20), 10,95);
   let hex3 = hex3d.init(hexMazeGenerator.createHexGrid(20), 20, 80);
   let hex4 = hex3d.init(hexMazeGenerator.createHexGrid(20), 30, 75);

let hex_1 = hex3d.init(hexMazeGenerator.createHexGrid(20), 0,100);
let hex_2 = hex3d.init(hexMazeGenerator.createHexGrid(20), -10,95);
let hex_3 = hex3d.init(hexMazeGenerator.createHexGrid(20), -20, 80);
let hex_4 = hex3d.init(hexMazeGenerator.createHexGrid(20), -30, 75);
   //let hex3 = hex3d.init(hexMazeGenerator.createHexGrid(5), 80, 80);


    hex3d.animate(hex2,95);
    hex3d.animate(hex3,90);
    hex3d.animate(hex4,85);

    hex3d.animate(hex_1,100);
    hex3d.animate(hex_2,90);
    hex3d.animate(hex_3,80);
    hex3d.animate(hex_4,70);*/






