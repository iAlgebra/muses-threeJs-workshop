var app  = app || {};

app.init = () => {
  // console.log("hello!!!");
  app.scene = new THREE.Scene();

  app.camera = new THREE.PerspectiveCamera(
      60, // field of view in degrees
      window.innerWidth / window.innerHeight, // screen ratio
      0.1, // near
      1000 // far
  );

  app.camera.position.x = -100;
  app.camera.position.y = 250;
  app.camera.position.z = 100;
  // app.camera.position.set(-100, 250, 100); shortcut

  app.camera.lookAt(app.scene.position); // (0,0,0)

  app.renderer = new THREE.WebGLRenderer();
  app.renderer.setSize(window.innerWidth, window.innerHeight);
  app.renderer.setClearColor(0x000000);
  app.renderer.setPixelRatio(window.devicePixelRatio || 1);

  document.getElementById('output').appendChild(app.renderer.domElement);

  /* axis helpers */
  // app.axes = new THREE.AxesHelper(200);
  // app.scene.add(app.axes);

  app.spotLight = app.createSpotLight();
  app.scene.add(app.spotLight);

  app.ambient = new THREE.AmbientLight(0x666666);
  app.scene.add(app.ambient);

  app.sphere = app.createSphere();
  app.scene.add(app.sphere);

  app.cube = app.createCube(50, 50, 0);
  app.scene.add(app.cube);

  app.cubes = [];
  for (let i = 0; i < 30; i++) {
    const range = 100;
    const cube = app.createCube(
        THREE.Math.randInt(-range, range), // x
        THREE.Math.randInt(-range, range), // y
        THREE.Math.randInt(-range, range), // z
    );
    app.scene.add(cube);
    app.cubes.push(cube);
  }

  app.particleSystem = app.createParticleSystem();
  app.scene.add(app.particleSystem);

  app.mouseControls = new THREE.OrbitControls(
      app.camera,
      app.renderer.domElement,
  )

  app.step = 0;

  app.animate();
}


window.onload = app.init;

app.animate = () => {

  app.animateParticleSystem();

  app.step += 0.1;

  app.sphere.rotation.y += 0.05;

  /* -------- moves the earth in circles ----------- */
  // app.sphere.position.x = Math.cos(app.step) * 20;
  // app.sphere.position.y = Math.sin(app.step) * 20;
  // app.sphere.position.z += 0.1;

  // app.sphere.position.x += 0.1;
  // app.sphere.position.y += 0.1;
  // app.sphere.position.z += 0.1;
  /*-------------------------------------------------*/

  app.cube.rotation.x += 0.01;
  app.cube.rotation.y += 0.01;
  app.cube.rotation.z += 0.01;

  app.cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  })

  app.renderer.render(app.scene, app.camera);

  app.mouseControls.update();

  requestAnimationFrame(app.animate);
}

app.resize = () => {
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.renderer.setSize(window.innerWidth, window.innerHeight);
  app.camera.updateProjectionMatrix();
  console.log('changed!');
}

window.addEventListener('resize', app.resize);
