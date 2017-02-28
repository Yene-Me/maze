import * as THREE from 'three';


let scene, camera, renderer;
let geometry, material, mesh, line;

let hexArrayPart2 = [];
let count = 0;
let speed = 0;


export default  class Hex3D {
    constructor() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 100, 1000);
        camera.position.z = 700;
        camera.position.y = 100;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }


    init(hexGrid, pointY,r) {

        let hexArray = [];
        let material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });

        for (let index = 0; index < hexGrid.length; index++) {
            let hex = hexGrid[index].hexData();

            let geometry = new THREE.Geometry();

            for (let i = 0; i < hex.length; i++) {

                geometry.vertices.push(new THREE.Vector3(hex[i].pointX, hex[i].pointY, hex[i].pointY));

            }
            geometry.vertices.push(new THREE.Vector3(hex[0].pointX, hex[0].pointY, hex[0].pointY));

            hexArray.push(new THREE.Line(geometry, material));

        }


        let _SLICE = Math.PI * 2 / hexArray.length;

        for (let index in hexArray) {
            let angle = index * _SLICE;
            hexArray[index].position.x = Math.sin(angle) * r;
            hexArray[index].position.y = pointY;
            hexArray[index].myAngle = angle;
            hexArray[index].position.z = Math.cos(angle) * r;
            scene.add(hexArray[index]);
        }

        //renderer.render(scene, camera);
        return hexArray;

    }


    animate(hexArray,r) {
       
        let that = this;
        requestAnimationFrame(function () {
            that.animate(hexArray,r);
        });
        speed += 0.001;
        //camera.rotation.z += 0.01;
        for (let index in hexArray) {
            let angle = hexArray[index].myAngle;
            hexArray[index].position.z = Math.cos(angle + speed) * r;
            hexArray[index].position.x = Math.sin(angle + speed) * r;
            //hexArray[index].position.y = Math.sin(angle) * r;
        }

        //camera.position.y = Math.sin(new Date().getTime()/1000);

        renderer.render(scene, camera);

    }
}