import {AfterViewInit, Component, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {Utils} from '../utils/utils';
import {Plan} from '../models/plans.model';
import {ToolsService} from '../service/tools.service';

/*RENDER*/
const renderer = Utils.getRenderer();
window.addEventListener('resize', onResize);

/*CAMERA*/
let camera: THREE.PerspectiveCamera = Utils.getCamera(2.5, 2.5, 2.5);

/*CONTROLS*/
Utils.initControls(camera, renderer);

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
  camera.aspect = window.innerWidth / (window.innerHeight);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.scss']
})
export class GuiComponent implements AfterViewInit {
  @ViewChild('scene') sceneDom: any;

  constructor(private toolService: ToolsService) {
  }

  ngAfterViewInit(): void {
    this.initRenderer();
    this.listenToEvents();
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

  private listenToEvents(): void {
    this.listenToPlanEvents();
  }

  private listenToPlanEvents(): void {
    this.toolService.getPlanEvent().subscribe((plan: Plan) => {
      camera = Utils.getCameraByPlan(plan);
      Utils.initControls(camera, renderer);
    });
  }
}
