import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import space from './assets/space.jpg';

function App() {
  useEffect(() => {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera, set position 
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,100);
  camera.position.z = 2;
  
  // Create  renderer
  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('threejs'), antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Orbit controls
  const orbit = new OrbitControls(camera, renderer.domElement);
  const axeshelper = new THREE.AxesHelper(5);
  scene.add(axeshelper);
  camera.position.set(-10, -10, 5);
  orbit.update();

  // Create a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  const material = new THREE.MeshStandardMaterial({color: 0xff0000, flatShading: true});
  const sun = new THREE.Mesh(geometry, material);
  scene.add(sun);

  const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemiLight);
  
 /*  scene.background = new THREE.CubeTextureLoader().load( [
    space,
    space,
    space,
    space,
    space,
    space,
  ] ); */
  
  function animate() {
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
  
})
  return (
    <div className="App">
      <canvas id="threejs"/>
    </div>
  )
}

export default App
