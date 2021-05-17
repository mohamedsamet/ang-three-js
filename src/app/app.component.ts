import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  public renderer = new THREE.WebGLRenderer();
  @ViewChild('scene') sceneDom: any;

  ngAfterViewInit(): void {
    this.initRenderer();
    this.createCube();
  }

  initRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.sceneDom.nativeElement.appendChild(this.renderer.domElement);
  }

  createCube(): void {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.camera.position.z = 5;
    setInterval(() => {
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      this.scene.add( cube );

      this.renderer.render(this.scene, this.camera);
    }, 41);
  }
}
