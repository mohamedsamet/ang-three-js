import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 )
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 12, 0x888888, 0x444444));
const controle = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

const cube = new THREE.Mesh(new THREE.BoxGeometry(.4, .4, .4), new THREE.MeshBasicMaterial({color: 0x00ff00}));
cube.position.set(.2, .2, .2)
scene.add(cube);
window.addEventListener('resize', onResize);

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
  }

  initRenderer(): void {
    this.sceneDom.nativeElement.appendChild(renderer.domElement);
    animate();
  }


}
