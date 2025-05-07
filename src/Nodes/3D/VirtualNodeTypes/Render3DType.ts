import { Graphics } from "p5";
import { AmbientLight, DirectionalLight, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ImageData } from "../../../Types/ImageData";
import { Color, Vector3 } from "../../../Types/vectorDataType";
import { toThreeColor, toThreeColorWithAlpha } from "../../../Utils/colorUtils";
import { StatefullElementType } from "../../../Utils/statefullContext";

export type ThreeJSContext = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  imageData: ImageData;
  parent: Object3D;
};

export type Render3DProps = [width: number, height: number, fov: number, cameraPosition: Vector3, cameraRotation: Vector3, clearColor: Color];
export class Render3DType extends StatefullElementType<ThreeJSContext, Render3DProps> {
  create(width: number, height: number, fov: number, cameraPosition: Vector3, cameraRotation: Vector3): ThreeJSContext {
    var scene = new Scene();
    var camera = new PerspectiveCamera(fov, width / height, 0.1, 1000);
    const renderer = new WebGLRenderer();
    const imageData = new ImageData();
    renderer.setSize(width, height);
    imageData.set({ width: width, height: height, elt: renderer.domElement } as Graphics);

    var lightAmbient = new AmbientLight(toThreeColor([0.3, 0.3, 0.3, 1]));
    scene.add(lightAmbient);
    var light = new DirectionalLight(toThreeColor([1, 1, 1, 1]), 1);
    light.position.set(0, 1, 1);
    scene.add(light);

    return { renderer, scene, camera, imageData, parent: scene };
  }
  remove(element: ThreeJSContext): void {
    element.renderer.dispose();
  }
  update(element: ThreeJSContext, width: number, height: number, fov: number, cameraPosition: Vector3, cameraRotation: Vector3, clearColor: Color): void {
    element.camera.fov = fov;
    element.camera.position.set(...cameraPosition);
    element.camera.rotation.set(...cameraRotation);
    element.renderer.setClearColor(...toThreeColorWithAlpha(clearColor));
  }

  override mountChildren(element: ThreeJSContext, child: any): void {
    element.scene.add(child);
  }
  override unmountChildren(element: ThreeJSContext, child: any): void {
    element.scene.remove(child);
  }
}
