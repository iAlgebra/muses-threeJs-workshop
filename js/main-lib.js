var app = app || {};

app.createSpotLight = () => {
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-10, 100, 50);

  return spotLight;
}


app.createSphere = () => {
  const sphereGeometry = new THREE.SphereGeometry(
      30,
      50,
      50,
  );

  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x8aeed4,
    // wireframe: true,
    map: new THREE.TextureLoader().load('img/earth.jpg'),
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0,0,0);

  return sphere;
}

app.createCube = (x, y, z) => {
  const cubeGeometry = new THREE.BoxGeometry(
      8, // width
      8, // height
      8, // depth
  );

  const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, y,z);

  cube.rotation.x = Math.random();
  cube.rotation.y = Math.random();
  cube.rotation.z = Math.random();

  cube.material.color.setRGB(
      Math.random(),
      Math.random(),
      Math.random(),
  )

  return cube;
}
