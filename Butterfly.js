const nbButterflies = 7;
var conf, scene, camera, light, renderer;
var whw, whh;

var butterflies;
var wingTexture1, wingTexture2, wingTexture3, wingTexture4;
var destination = new THREE.Vector3();

var mouse = new THREE.Vector2();
var mouseOver = false;
var mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
var mousePosition = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

function init() {
  conf = {
    attraction: 0.02,
    velocityLimit: 1.04,
    move: true,
    followMouse: false,
    shuffle: shuffle
  };

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  initScene();

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  // document.addEventListener('mouseover', function () { mouseOver = true; }, false);
  // document.addEventListener('mouseout', function () { mouseOver = false; }, false);

  animate();
};

function initScene() {
  scene = new THREE.Scene();

  camera.position.z = 75;
  
  function bfWing(color1, color2) {

  const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
  }
  
  color1 = isColor(color1) ? color1 : '#ff0000';
  color2 = isColor(color2) ? color2 : '#ff0000';
    
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xlink','http://www.w3.org/1999/xlink');
  svg.setAttribute('width','256px');
  svg.setAttribute('height','256px');
  svg.setAttribute('viewBox','0 0 184 184');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttributeNS(null, 'id','shape01');
  path1.setAttributeNS(null, 'transform','matrix(-0.565789270559871 -2.0287598849426 2.02632340029178 -0.565109773255358 39.7636073001623 190.515935894657)');
  path1.setAttributeNS(null, 'fill', color1);
  path1.setAttributeNS(null, 'd','M41.0583 80.3705C25.5231 62.6662 -7.28841 30.453 1.45829 11.2506C14.6783 -11.6107 39.2308 7.38013 40.4214 7.76966C41.4722 7.88272 40.316 7.44623 41.0583 7.89048C41.1919 26.5669 41.0561 70.0543 41.0583 80.3705Z');

  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttributeNS(null, 'id','shape02');
  path2.setAttributeNS(null, 'transform','matrix(0.565789282777467 2.02875992875144 2.02632344404801 -0.565109785458285 -6.78022560551816 24.102209365588)');
  path2.setAttributeNS(null, 'fill', color2);
  path2.setAttributeNS(null, 'd','M41.0583 80.3705C25.5231 62.6662 -7.28841 30.453 1.45829 11.2506C14.6783 -11.6107 39.2308 7.38013 40.4214 7.76966C41.4722 7.88272 40.316 7.44623 41.0583 7.89048C41.1919 26.5669 41.0561 70.0543 41.0583 80.3705Z');

  svg.appendChild(path2);

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttributeNS(null, 'id','layer1');
  g.setAttributeNS(null, 'transform','translate(0 0)');

  svg.appendChild(g);

  const svgData = (new XMLSerializer()).serializeToString(svg);
  const base64 = window.btoa(unescape(encodeURIComponent(svgData)));
  const src = "data:image/svg+xml;base64," + base64;

  return src;
}

  wingTexture1 = new THREE.TextureLoader().load(bfWing('#7bb943','#4ba24a'));
  wingTexture2 = new THREE.TextureLoader().load(bfWing('#5bacdd','#528fa8'));
  wingTexture3 = new THREE.TextureLoader().load(bfWing('#5da3a3','#4e987d'));
  wingTexture4 = new THREE.TextureLoader().load(bfWing('#58ae73','#4ba24a'));

  butterflies = [];
  butterfly = [];
  for (var i = 0; i < nbButterflies; i++) {
    var b = new Butterfly();
    butterflies.push(b);
    butterfly[i] = b.o3d
    scene.add(butterfly[i]);
  }

  shuffle();
  
var spotOn = true;
window.setInterval(function(){spot()},0);

function spot() {

    if(spotOn) {
  var div = document.getElementById("facebook");
  var rect = div.getBoundingClientRect();

  var width = div.clientWidth;
  var height = div.clientHeight;
  
  var v = new THREE.Vector3();
  camera.getWorldDirection(v);
  v.normalize();
  mousePlane.normal = v;

  mouse.x = ((rect.left + (width / 2)) / window.innerWidth) * 2 - 1;
  mouse.y = -((rect.top + (height / 2)) / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(mousePlane, destination);
  }
    spotOn = !spotOn;
}

}

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();

  if (conf.move) {
    for (var i = 0; i < butterflies.length; i++) {
      butterflies[i].move();
    }
  }

  renderer.render(scene, camera);
};

function shuffle() {
  for (var i = 0; i < butterflies.length; i++) {
    butterflies[i].shuffle();
  }
}

function Butterfly() {
  this.minWingRotation = -Math.PI / 6;
  this.maxWingRotation = Math.PI / 2 - 0.1;
  this.wingRotation = 0;

  this.velocity = new THREE.Vector3(rnd(1, true), rnd(1, true), rnd(1, true));
  this.destination = destination;

  var confs = [
    { wingTexture: wingTexture1, wingW: 10, wingH: 15, wingX: 5.5 },
    { wingTexture: wingTexture2, wingW: 15, wingH: 20, wingX: 7.5 },
    { wingTexture: wingTexture3, wingW: 10, wingH: 15, wingX: 5.5 },
    { wingTexture: wingTexture4, wingW: 15, wingH: 20, wingX: 8 },
  ];

  this.init(confs[Math.floor(rnd(4))]);
}

Butterfly.prototype.init = function (bconf) {
  var geometry = new THREE.PlaneGeometry(bconf.wingW, bconf.wingH);
  var material = new THREE.MeshBasicMaterial({ transparent: true, map: bconf.wingTexture, side: THREE.DoubleSide, depthTest: false });
  var lwmesh = new THREE.Mesh(geometry, material);
  lwmesh.position.x = -bconf.wingX;
  this.lwing = new THREE.Object3D();
  this.lwing.add(lwmesh);

  var rwmesh = new THREE.Mesh(geometry, material);
  rwmesh.rotation.y = Math.PI;
  rwmesh.position.x = bconf.wingX;
  this.rwing = new THREE.Object3D();
  this.rwing.add(rwmesh);

  this.group = new THREE.Object3D();
  this.group.add(this.lwing);
  this.group.add(this.rwing);
  this.group.rotation.x = Math.PI / 2;
  this.group.rotation.y = Math.PI;

  this.setWingRotation(this.wingRotation);
  this.initTween();

  this.o3d = new THREE.Object3D();
  this.o3d.add(this.group);
};

Butterfly.prototype.initTween = function () {
  var duration = limit(conf.velocityLimit - this.velocity.length(), 0.1, 1.5) * 1000;
  this.wingRotation = this.minWingRotation;
  this.tweenWingRotation = new TWEEN.Tween(this)
    .to({ wingRotation: this.maxWingRotation }, duration)
    .repeat(1)
    .yoyo(true)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onComplete(function(object) {
      object.initTween();
    })
    .start();
};

Butterfly.prototype.move = function () {
  var destination;
  if (mouseOver && conf.followMouse) {
    destination = mousePosition;
  } else {
    destination = this.destination;
  }

  var dv = destination.clone().sub(this.o3d.position).normalize();
  this.velocity.x += conf.attraction * dv.x;
  this.velocity.y += conf.attraction * dv.y;
  this.velocity.z += conf.attraction * dv.z;
  this.limitVelocity();

  // update position & rotation
  this.setWingRotation(this.wingRotation);
  this.o3d.lookAt(this.o3d.position.clone().add(this.velocity));
  this.o3d.position.add(this.velocity);
};

Butterfly.prototype.limitVelocity = function (y) {
  this.velocity.x = limit(this.velocity.x, -conf.velocityLimit, conf.velocityLimit);
  this.velocity.y = limit(this.velocity.y, -conf.velocityLimit, conf.velocityLimit);
  this.velocity.z = limit(this.velocity.z, -conf.velocityLimit, conf.velocityLimit);
};

Butterfly.prototype.setWingRotation = function (y) {
  this.lwing.rotation.y = y;
  this.rwing.rotation.y = -y;
};

Butterfly.prototype.shuffle = function () {
  this.velocity = new THREE.Vector3(rnd(1, true), rnd(1, true), rnd(1, true));
  var p = new THREE.Vector3(rnd(1, true), rnd(1, true), rnd(1, true)).normalize().multiplyScalar(100);
  this.o3d.position.set(p.x, p.y, p.z);
  var scale = rnd(0.4) + 0.1;
  this.o3d.scale.set(scale, scale, scale);
}

function limit(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function rnd(max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max;
}

function onWindowResize() {
  whw = window.innerWidth / 2;
  whh = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
