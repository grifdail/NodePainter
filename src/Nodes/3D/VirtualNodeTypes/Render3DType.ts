import { EffectComposer, RenderPass } from "postprocessing";
import { Camera, LinearSRGBColorSpace, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ImageData } from "../../../Types/ImageData";
import { PostProcessLayer, PostProcessLayerUtils } from "../../../Types/PostProcessLayer";
import { Color } from "../../../Types/vectorDataType";
import { toThreeColorWithAlpha } from "../../../Utils/math/colorUtils";
import { StatefullElementType } from "./statefullContext";

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
    parent: Object3D;
    postProcessComposer: EffectComposer
};

export type Render3DProps = [width: number, height: number, clearColor: Color, postprocess: PostProcessLayer[]];
export class Render3DType extends StatefullElementType<ThreeJSContext, Render3DProps> {
    create(width: number, height: number, _clearColor: any, postprocess: PostProcessLayer[]): ThreeJSContext {
        var scene = new Scene();
        var camera = new PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.set(...DEFAULT_CAMERA_TRANSFORM.position);
        camera.fov = 60;
        camera.quaternion.set(...DEFAULT_CAMERA_TRANSFORM.rotation);
        const renderer = new WebGLRenderer({
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false
        });
        renderer.outputColorSpace = LinearSRGBColorSpace;
        const imageData = new ImageData({ canvas: { width: width, height: height, elt: renderer.domElement } });
        renderer.setSize(width, height);
        const composer = setupPostProcess(renderer, scene, camera, postprocess);
        return { renderer, scene, defaultCamera: camera, camera, imageData, parent: scene, postProcessComposer: composer };
    }
    remove(element: ThreeJSContext): void {
        element.renderer.dispose();
    }
    update(element: ThreeJSContext, width: number, height: number, clearColor: Color): void {
        element.renderer.setClearColor(...toThreeColorWithAlpha(clearColor));
    }

    override mountChildren(element: ThreeJSContext, child: any): void {
        if ("isCamera" in child) {
            element.camera = child;
            element.postProcessComposer.setMainCamera(child);
        }
        element.scene.add(child);
    }
    override unmountChildren(element: ThreeJSContext, child: any): void {
        if ("isCamera" in child) {
            element.camera = null;
        }
        element.scene.remove(child);
    }
}
function setupPostProcess(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera, postprocess: PostProcessLayer[]) {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    postprocess.forEach(layer => {
        var data = PostProcessLayerUtils[layer.type];
        data.addEffect(layer as any, composer, camera, scene)
    })

    return composer;
}

