import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface Position {
  x: number;
  y: number;
  z: number;
}
export class Utils {
  static getCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 100 );
    camera.position.set(2.5, 2.5, 2.5);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  static getScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);
    return scene;
  }

  static InitControls(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer): OrbitControls {
    return new OrbitControls(camera, renderer.domElement);
  }

  static getRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  }

  static addGridToScene(scene: THREE.Scene): void {
    scene.add(new THREE.GridHelper(6, 12, 0xe0e0e0, 0xe0e0e0));
    scene.add(new THREE.AxesHelper( 25 ));
  }

  static getLightPoint(color: number, intensity: number, distance: number, position: Position): THREE.PointLight {
    const light = new THREE.PointLight(color, intensity, distance);
    light.position.set(position.x, position.y, position.z);
    return light;
  }
}
