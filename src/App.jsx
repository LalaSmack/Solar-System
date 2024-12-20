import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { BloomPass } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { OutputPass } from 'three/examples/jsm/Addons.js';
import * as dat from 'dat.gui';

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
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';

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
  camera.position.set(-40, 35, -20);
  orbit.update();

  // Effects composer
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  
  // bloom effect
  const options = {
    exposure: 1,
    bloomStrength: 0.55,
    bloomRadius: 0.1,
    bloomThreshold: 0.2
  };

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = options.bloomStrength;
	bloomPass.strength = options.bloomStrength;
	bloomPass.radius = options.bloomRadius;
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // GUI
  
  const sunGeo = new THREE.SphereGeometry(9, 32, 16);
  const textLoader = new THREE.TextureLoader();
  const sunMat = new THREE.MeshBasicMaterial({flatShading: true, map: textLoader.load(sunTexture)});
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);
  
  // Planets
  function makePlanet(radius, position, texture){
    const planetGeo = new THREE.SphereGeometry(radius, 32, 16);
    const planetMat = new THREE.MeshStandardMaterial({ map: textLoader.load(texture)});
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(0, 0, position);
    const obj = new THREE.Object3D();
    obj.add(planet);
    scene.add(obj);
    return {planet, obj};
  }

  const mercury = makePlanet(0.35, 14.7, mercuryTexture);
  const venus = makePlanet(0.87, 19.8, venusTexture);
  const earth = makePlanet(0.92, 24.9, earthTexture);
  const mars = makePlanet(0.49, 31.8, marsTexture);
  const jupiter = makePlanet(3.3, 40.8, jupiterTexture);
  const saturn = makePlanet(2.6, 50, saturnTexture);
  const uranus = makePlanet(1.6, 60, uranusTexture);
  const neptune = makePlanet(1.5, 70, neptuneTexture);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff,1000, 300);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

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
    mercury.planet.rotateY(0.005);
    venus.planet.rotateY(0.004);
    earth.planet.rotateY(0.003);
    mars.planet.rotateY(0.002);
    jupiter.planet.rotateY(0.001);
    saturn.planet.rotateY(0.0005);
    uranus.planet.rotateY(0.0003);
    neptune.planet.rotateY(0.0002);

    mercury.obj.rotateY(0.009);
    venus.obj.rotateY(0.007);
    earth.obj.rotateY(0.005);
    mars.obj.rotateY(0.0025);
    jupiter.obj.rotateY(0.0005);
    saturn.obj.rotateY(0.00016);
    uranus.obj.rotateY(0.00008);
    neptune.obj.rotateY(0.00003);
    //renderer.render(scene, camera);
    composer.render();
  }
  renderer.setAnimationLoop(animate);

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
  
})
  return (
    <div className="App">
      <canvas id="threejs"/>
    </div>
  )
}

export default App
