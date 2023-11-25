import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import stars from "./imgs/stars.jpg";
import earth from "./imgs/earth.jpg";

const canvas = document.querySelector("canvas.webgl");
console.log(stars);
// scene
const scene = new THREE.Scene();
console.log(scene);

// camera
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// object - sphere
const geometry = new THREE.SphereGeometry(3, 35, 35);
const material = new THREE.MeshBasicMaterial({ color: "lime" });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.position.y = 10;

//object - plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

// grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// renderer
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// updating the camera
camera.position.z = 5;
camera.position.set(-10, 30, 30);
controls.update();

// background image
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);

// clock
const clock = new THREE.Clock();

// animate function
function animate() {
  requestAnimationFrame(animate);

  //time
  const elapsedTime = clock.getElapsedTime();

  // rotation and movements
  sphere.position.y = Math.sin(elapsedTime) * 10;
  sphere.position.x = Math.cos(elapsedTime) * 2;

  // controls
  controls.update();
  camera.lookAt(sphere.position);

  // updating the renderer
  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
