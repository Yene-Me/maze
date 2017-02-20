import SqrMazeGenerator from './SqrMaze/SqrMazeGenerator';
import HexMazeGenerator from './HexMaze/HexMazeGenerator';


/*let sqrMazeGenerator = new SqrMazeGenerator();

    sqrMazeGenerator.createCell();
    sqrMazeGenerator.createMaze();
    sqrMazeGenerator.startAI();*/

let hexMazeGenerator = new HexMazeGenerator();
    hexMazeGenerator.createHexGrid(1);
    hexMazeGenerator.drawHexGrid(9,100,120);
    hexMazeGenerator.drawHexGrid(10,80,152);
    hexMazeGenerator.drawHexGrid(9,100,185);




