import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';

function App() {
  useEffect(() => {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera, set position 
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1,10);
  camera.position.z = 2;
  
  // Create  renderer
  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('threejs'), antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);
})
  return (
    <div className="App">
      <canvas id="threejs"/>
    </div>
  )
}

export default App
