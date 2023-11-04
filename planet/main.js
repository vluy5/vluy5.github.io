
window.addEventListener('DOMContentLoaded', init);

class Sph{
  constructor( radius, widthseg, heightseg,rotx,roty,rotz) {
    function getColor(){
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    this.geometry = new THREE.SphereGeometry(radius, widthseg,heightseg);
    this.material = new THREE.MeshBasicMaterial(
        { color: getColor(),
          wireframe: true ,
          blending: THREE.AdditiveBlending,
          transparent: true}
    );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.rotx=rotx;
    this.roty=roty;
    this.rotz=rotz;
  }

  getMesh(){
    return this.mesh;
  }

  next(){
    this.mesh.rotation.x += this.rotx;
    this.mesh.rotation.y += this.roty;
    this.mesh.rotation.z += this.rotz;
  }

}

function init() {
    let width;
    let height;
    let array=[];

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas'),
      antialias: true
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1.0);
    camera.position.set(0, 0, +1000);
    for(let i=1;i<=3;i++){
      const p=(function(v){let r=0;(v>=0.5)? r=1: r=-1;return r;})(Math.random());
      const q=(function(v){let r=0;(v>=0.5)? r=1: r=-1;return r;})(Math.random());
      const r=(function(v){let r=0;(v>=0.5)? r=1: r=-1;return r;})(Math.random());
      const sp=new Sph(i*100,30,30,0.03*p,0.03*q,0.03*r);
      scene.add(sp.getMesh());
      array.push(sp);
    }
    tick();
    function tick() {
      for(let i=0;i<array.length;i++){
        array[i].next();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    onResize();
    window.addEventListener('resize', onResize);
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }