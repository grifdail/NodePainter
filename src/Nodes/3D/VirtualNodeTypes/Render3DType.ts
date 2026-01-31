import { Camera, LinearSRGBColorSpace, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ImageData } from "../../../Types/ImageData";

export const DEFAULT_CAMERA_TRANSFORM = {
    position: [0, 0, 10] as const,
    rotation: [0, 0, 0, 1] as const
}

export type ThreeJSContext = {
    renderer: WebGLRenderer;
    scene: Scene;
    defaultCamera: PerspectiveCamera;
    camera: Camera | null;
    imageData: ImageData;
    dispose: () => void;
};


export function createThreeJSContext(width: number, height: number): ThreeJSContext {
    var scene = new Scene();
    var camera = new PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(...DEFAULT_CAMERA_TRANSFORM.position);
    camera.fov = 60;
    camera.quaternion.set(...DEFAULT_CAMERA_TRANSFORM.rotation);
    const renderer = new WebGLRenderer();
    renderer.outputColorSpace = LinearSRGBColorSpace;
    const imageData = new ImageData({ canvas: { width: width, height: height, elt: renderer.domElement } });
    renderer.setSize(width, height);
    return {
        renderer, scene, defaultCamera: camera, camera, imageData, dispose: () => {
            renderer.dispose();
        }
    };
}