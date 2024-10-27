import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';

import space from './assets/space.jpg';

function App() {
  useEffect(() => {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera, set position 
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1,1000);
  camera.position.z = 2;
  
  // Create  renderer
  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('threejs'), antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  
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

  renderer.render(scene, camera);
})
  return (
    <div className="App">
      <canvas id="threejs"/>
    </div>
  )
}

export default App
