    var camera, scene, renderer;

        var loader;

        init();

        function init() {
            renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true} );
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0xfafdfd, 0);
            document.body.appendChild( renderer.domElement );

            var light = new THREE.PointLight( new THREE.Color( "0xffffff" ), 2, 100 );
            light.position.set( 0,5,0 );
            scene.add( light );

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set( 0,5,7 );
            camera.lookAt( 0, 0, 0 );

            loader = new THREE.GLTFLoader();
            loader.load( './resources/models/misyst_logo/scene.gltf',  
                function( gltf ) {
                  for (var i = 0; i < 8; i++) {

                    var model = gltf.scene.children[0];
                    model.material.opacity = 0.11;
                    model.material.transparent = true;
              
                    scene.add(model);
                  }
                }, 
                function ( xhr ) {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function ( error ) {
                    console.log( 'An Error Occurred' );
                }
            );

            renderer.render( scene, camera );
        }