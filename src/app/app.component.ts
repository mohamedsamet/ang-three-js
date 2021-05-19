import {AfterViewInit, Component, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { Utils } from './utils';

/*RENDER*/
const renderer = Utils.getRenderer();
window.addEventListener('resize', onResize);

/*CAMERA*/
const camera: THREE.PerspectiveCamera = Utils.getCamera();

/*CONTROLs*/
Utils.InitControls(camera, renderer);

/*SCENE*/
const scene = Utils.getScene();
Utils.addGridToScene(scene);

/*LIGHTS*/
const pointLight1 = Utils.getLightPoint(0xffffff, 1.5, 50, {x: 3, y: 3.5, z: 2.5});
scene.add(pointLight1);
const pointLight2 = Utils.getLightPoint(0xffffff, 1, 50, {x: -3, y: -2, z: -2.5});
scene.add(pointLight2);

export function animate(): any {
  requestAnimationFrame(animate as any as FrameRequestCallback);
  renderer.render(scene, camera);
}

export function onResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('scene') sceneDom: any;

  ngAfterViewInit(): void {
    this.initRenderer();
    this.addCube();
  }

  initRenderer(): void {
    this.sceneDom.nativeElement.appendChild(renderer.domElement);
    animate();
  }

  private addCube(): void {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(.4, .4, .4), new THREE.MeshStandardMaterial({metalness: .1, roughness: 0.5}));
    cube.position.set(.2, .2, .2);
    scene.add(cube);
  }
}
