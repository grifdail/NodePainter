import { LinearSRGBColorSpace, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ImageData } from "../../../Types/ImageData";
import { Color, Quaternion, Vector3 } from "../../../Types/vectorDataType";
import { toThreeColorWithAlpha } from "../../../Utils/colorUtils";
import { StatefullElementType } from "../../../Utils/statefullContext";

export type ThreeJSContext = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  imageData: ImageData;
  parent: Object3D;
};

export type Render3DProps = [width: number, height: number, fov: number, cameraPosition: Vector3, camerarotation: Quaternion, clearColor: Color];
export class Render3DType extends StatefullElementType<ThreeJSContext, Render3DProps> {
  create(width: number, height: number, fov: number, cameraPosition: Vector3, camerarotation: Quaternion): ThreeJSContext {
    var scene = new Scene();
    var camera = new PerspectiveCamera(fov, width / height, 0.1, 100);
    const renderer = new WebGLRenderer();
    renderer.outputColorSpace = LinearSRGBColorSpace;
    const imageData = new ImageData({ canvas: { width: width, height: height, elt: renderer.domElement } });
    renderer.setSize(width, height);
    return { renderer, scene, camera, imageData, parent: scene };
  }
  remove(element: ThreeJSContext): void {
    element.renderer.dispose();
  }
  update(element: ThreeJSContext, width: number, height: number, fov: number, cameraPosition: Vector3, camerarotation: Quaternion, clearColor: Color): void {
    element.camera.fov = fov;
    element.camera.position.set(...cameraPosition);
    element.camera.quaternion.set(...camerarotation);
    element.renderer.setClearColor(...toThreeColorWithAlpha(clearColor));
  }

  override mountChildren(element: ThreeJSContext, child: any): void {
    element.scene.add(child);
  }
  override unmountChildren(element: ThreeJSContext, child: any): void {
    element.scene.remove(child);
  }
}
