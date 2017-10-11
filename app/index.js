import SqrMazeGenerator from './SqrMaze/SqrMazeGenerator';
import HexMazeGenerator from './HexMaze/HexMazeGenerator';
import Hex3D from './HexMaze/Hex3D';


function sqrMaze()
{

    //sqrMazeGenerator.startAI(sqrMazeGenerator.pathOne);
}



function hexMaze ()
{
    let hexMazeGenerator = new HexMazeGenerator(6,6, 20, 2.5,3);
    hexMazeGenerator.createHexGrid();
    hexMazeGenerator.drawHexGrid(0,0);
    hexMazeGenerator.drawHexGrid(25,30);

}

function threeDmaze()
{



    let sqrMazeGenerator = new SqrMazeGenerator();

    sqrMazeGenerator.createCell();
    //sqrMazeGenerator.startAI(sqrMazeGenerator.pathOne);

    let grid = sqrMazeGenerator.createMaze();
    let hex3d = new Hex3D(grid);
    hex3d.loadTextture();

}


threeDmaze();




