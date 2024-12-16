import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

// Textures
import spaceTexture from './assets/space3.jpg';
import sunTexture from './assets/sun.jpg';
import mercuryTexture from './assets/mercury.jpg';
import venusTexture from './assets/venus.jpg';
import earthTexture from './assets/earth.jpg';
import marsTexture from './assets/mars.jpg';
import jupiterTexture from './assets/jupiter.jpg';
import saturnTexture from './assets/saturn.jpg';
import uranusTexture from './assets/uranus.jpg';
import neptuneTexture from './assets/neptune.jpg';

function App() {
  useEffect(() => {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera, set position 
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
  
  // Create  renderer
  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('threejs'), antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Orbit controls
  const orbit = new OrbitControls(camera, renderer.domElement);
  const axeshelper = new THREE.AxesHelper(10);
  scene.add(axeshelper);
  camera.position.set(25, 10, 5);
  orbit.update();

  // Effects composer
  const composer = new EffectComposer(renderer);
  

  // sun
  const sunGeo = new THREE.SphereGeometry(9, 32, 16);
  const textLoader = new THREE.TextureLoader();
  const sunMat = new THREE.MeshBasicMaterial({flatShading: true, map: textLoader.load(sunTexture)});
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);
  
  function makePlanet(radius, position, texture){
    const planetGeo = new THREE.SphereGeometry(radius, 32, 16);
    const planetMat = new THREE.MeshBasicMaterial({flatShading: true, map: textLoader.load(texture)});
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(0, 0, position);
    const obj = new THREE.Object3D();
    obj.add(planet);
    scene.add(planet);
    return planet
  }

  const mercury = makePlanet(0.35, 14.7, mercuryTexture);
  const venus = makePlanet(0.87, 19.8, venusTexture);
  const earth = makePlanet(0.92, 24.9, earthTexture);
  const mars = makePlanet(0.49, 31.8, marsTexture);
  const jupiter = makePlanet(3.3, 40.8, jupiterTexture);
  const saturn = makePlanet(2.6, 50, saturnTexture);
  const uranus = makePlanet(1.6, 60, uranusTexture);
  const neptune = makePlanet(1.5, 70, neptuneTexture);


  const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemiLight);
  
  //background
  scene.background = new THREE.CubeTextureLoader()
	.load( [ 
          spaceTexture,
          spaceTexture,
          spaceTexture,
          spaceTexture,
          spaceTexture,
          spaceTexture,
    			] );
  

  function animate() {
    sun.rotateY(0.0005);
    renderer.render(scene, camera);
    //composer.render();
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
