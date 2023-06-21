const loader = new THREE.GLTFLoader();
loader.load("./resources/models/misyst_logo/scene.gltf",
      (gltf) => {
        gltf.scene.scale.multiplyScalar(1 / 100); // adjust scalar factor to match your scene scale
        gltf.scene.position.x = 20; // once rescaled, position the model where needed
        gltf.scene.position.z = -20;

        scene.add(gltf.scene);
        render();
      },
      (err) => {
        console.error(err);
      }
    );