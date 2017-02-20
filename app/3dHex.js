
init();
animate();


var scene, camera, renderer;
var geometry, material, mesh, line;
var hexArray = [];
var hexArrayPart2 = [];



function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    camera.position.x = -100;

    var material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });


    for (var index = 0; index < hexGrid.length; index++) {
        var hex = hexGrid[index].hexData();


        var geometry = new THREE.Geometry();

        for (var i = 0; i < hex.length; i++) {

            geometry.vertices.push(new THREE.Vector3(hex[i].pointX, hex[i].pointY,  hex[i].pointY));

        }
        geometry.vertices.push(new THREE.Vector3(hex[0].pointX, hex[0].pointY,  hex[0].pointY));

        hexArray.push(new THREE.Line(geometry, material));

    }


    var geometry11 = new THREE.CylinderGeometry(80, 80, 20, 7);
    var object = new THREE.Mesh(geometry11, new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.4}));
    var count = 1;
    var _SLICE = Math.PI * 2 / hexArray.length;

    for (var index in hexArray) {
        var angle = index * _SLICE;
        hexArray[index].position.x = 20 * index;
        hexArray[index].position.y = 20 * index;
        hexArray[index].position.z = Math.cos(angle) * 20;
        scene.add(hexArray[index]);
    }


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    //renderer.render(scene, camera);

}
var count = 1;
function animate() {

    requestAnimationFrame(animate);

    //camera.rotation.z += 0.01;
    count++;
    hexArray[0].position.y = Math.cos( hexArray[0].position.y+=0.01);

    //camera.rotation.x += 0.01;

    renderer.render(scene, camera);

}