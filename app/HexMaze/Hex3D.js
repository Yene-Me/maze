import * as THREE from 'three';

let scene, camera, renderer , light;

export default  class Hex3D {
    constructor(grid) {
        this._grid= grid;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
        //camera.position.z = 10;
        //camera.position.y = 1;
        //camera.position.x = 0;

        camera.lookAt(scene.position);

        light =  new THREE.AmbientLight( 0x404040 );
        renderer = new THREE.WebGLRenderer({ antialias: false,alpha:true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        this.textureItems= [];
        this.loader = new THREE.TextureLoader();

        this.loadTexttureUrl = ['asset/wall.jpg', 'asset/floor.jpg','asset/floor2.jpg'];
    }

    loadTextture()
    {
        // instantiate a loader

        this.loader.load(

            this.loadTexttureUrl[0],

             ( texture ) =>{

                this.textureItems.push(texture);
                this.loadTexttureUrl.shift();

                if(this.loadTexttureUrl.length != 0)
                {
                  this.loadTextture();
                }else
                    {
                     this.init();
                }

            },

             ( xhr ) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

             ( xhr ) => {
                console.log( 'An error happened' , xhr);
            }
        );
    }


    init() {

        let grid = this.createGrid(this._grid);

        grid.position.set(-8,5,-20);
        grid.rotateX(0.5);
        scene.add(grid);
        scene.add( light );
        this.animate([grid]);
    }

    createGrid(grids) {
        let grid = new THREE.Group();

        let x = 0;
        let y = 0;
        let z = 0;
        for (let index = 0; index < grids.length; index++) {
            let cell = this.createCell(grids[index]);
            cell.position.set(grids[index].x,y,grids[index].y);
            grid.add(cell);
        }

        return grid;
    }

    createCell(cellData)
    {
        //console.log(cellData['wallStatus']);
        let wallStatus = cellData['wallStatus'];
        let cell = new THREE.Group();

        if(wallStatus[0])
        {
            let south = this.createWall({x:0.2,y:1,z:1},{x:0,y:0,z:0}, 0xff0000, {x:0, y: Math.PI / 2 },this.textureItems[0]);
            cell.add(south);
        }
        if(wallStatus[1] )
        {
            let west = this.createWall({x:0.2,y:1,z:1},{x:0.5,y:0,z:0.5}, 0x00ff00, {x:0, y:Math.PI},this.textureItems[0]);
            cell.add(west);
        }
        if(wallStatus[3])
        {
            let east = this.createWall({x:0.2,y:1,z:1},{x:-0.5,y:0,z:0.5}, 0x0000ff, {x:0, y:0},this.textureItems[0]);
            cell.add(east);
        }
        if(wallStatus[2])
        {
            let north= this.createWall({x:0.2,y:1,z:1},{x:0.0,y:0,z:1}, 0xffffff, {x:0, y:Math.PI/2},this.textureItems[0]);
            cell.add(north);
        }

        let floor= this.createWall({x:0,y:1,z:0.5},{x:0.0,y:-0.5,z:0.5}, 0xffffff, {x:Math.PI/2, y:Math.PI/2},this.textureItems[2]);
        cell.add(floor);

        return cell;

    }

    createWall(size,pos, color,rotation ,texture)
    {
        let geometry = new THREE.BoxGeometry( size.x, size.y, size.y);
        let material = new THREE.MeshBasicMaterial( {
            map: texture
        }  );
        let cube = new THREE.Mesh( geometry, material );
        cube.rotateX(rotation.x);
        cube.rotateY(rotation.y);

        cube.position.set(pos.x,pos.y,pos.z);

        return cube;
    }


    animate(cells) {

        renderer.render(scene, camera);

        for(let item in cells)
        {
            //cells[item].position.set(-8,10,-20);
            //camera.rotateY( Math.sin(0.01));
            //cells[item].rotateY(0);
            //cells[item].rotateX(0.02);
        }

        requestAnimationFrame(()=>{
            this.animate(cells);
        });

    }
}