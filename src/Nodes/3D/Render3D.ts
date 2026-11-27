import { IconBadge3d } from "@tabler/icons-react";
import { EffectComposer, RenderPass } from "postprocessing";
import { Camera, LinearSRGBColorSpace, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../Types/PostProcessNodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";
import { computeResolution } from "../../Utils/graph/execution/computeResolution";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";
import { toThreeColorWithAlpha } from "../../Utils/math/colorUtils";
import { toQuaternion } from "../../Utils/math/quaternionUtils";

export const DEFAULT_CAMERA_TRANSFORM = {
    position: [0, 0, 10] as const,
    rotation: [0, 0, 0, 1] as const
}
type EffectCollection = Record<string, (layer: PostProcessLayer) => void>;

export const CAMERA_3D_TRANSFORM = "camera_3d_transform"

export type ThreeJSContext = {
    renderer: WebGLRenderer;
    scene: Scene;
    defaultCamera: PerspectiveCamera;
    camera: Camera | null;
    imageData: ImageData;
    parent: Object3D;
    postProcessComposer: EffectComposer,
    effects: EffectCollection
};

export const Render3D: NodeDefinition = {
    id: "3D/Render",
    label: "Render in 3D",
    icon: IconBadge3d,
    description: "Render  a 3d scene to an image.",

    dataInputs: [
        Port.object3d("camera"),
        {
            id: "clearColor",
            type: "color",
            defaultValue: createColor(1, 1, 1, 1),
        },
        {
            id: "scene",
            type: "object3d",
            defaultValue: null,
        },
        Port["array-struct"]("effects", [])
    ],
    dataOutputs: [
        {
            id: "image",
            type: "image",
            defaultValue: null,
        },
    ],
    tags: ["3D"],
    settings: [
        SettingGenerator.resolution("resolution", { mode: "original" })
    ],
    getData(portId, node, context) {
        const { width, height } = computeResolution(context, node.settings.resolution)

        //Inputs
        const clearColor = context.getInputValueColor(node, "clearColor");
        const userCamera = context.getInputValue(node, "camera", "object3d") as Camera;

        //An hack to get the camera position
        context.blackboard[CAMERA_3D_TRANSFORM] = getTransform(userCamera);
        const child = context.getInputValue(node, "scene", "object3d") as Object3D;
        const postProcessRaw = context.getInputValue(node, "effects", "array-struct") as any[] || [];
        const postProcess = validateEffectLayers(postProcessRaw, context)

        const threeContext = readFromCacheWithVersion<ThreeJSContext>(context, node, () => {
            var scene = new Scene();
            var camera = new PerspectiveCamera(60, width / height, 0.1, 100);
            camera.position.set(...DEFAULT_CAMERA_TRANSFORM.position);
            camera.fov = 60;
            camera.quaternion.set(...DEFAULT_CAMERA_TRANSFORM.rotation);
            const renderer = new WebGLRenderer({
                powerPreference: "high-performance",
                antialias: false,
                stencil: false,
                depth: true
            });
            renderer.outputColorSpace = LinearSRGBColorSpace;
            const imageData = new ImageData({ canvas: { width: width, height: height, elt: renderer.domElement } });
            renderer.setSize(width, height);
            const [composer, effects] = setupPostProcess(renderer, scene, camera, postProcess, context);

            return { renderer, scene, defaultCamera: camera, camera: camera as Camera, imageData, parent: scene, postProcessComposer: composer, effects };
        })
        if (threeContext.scene.children[0] !== child) {
            if (child) {
                threeContext.scene.remove(threeContext.scene.children[0]);
                threeContext.scene.add(child);
            }

        }
        if (userCamera !== threeContext.camera) {
            if (userCamera) {
                threeContext.camera = userCamera;
                threeContext.postProcessComposer.setMainCamera(userCamera);
            } else {
                threeContext.camera = threeContext.defaultCamera;
                threeContext.postProcessComposer.setMainCamera(threeContext.defaultCamera);
            }

        }
        threeContext.renderer.setClearColor(...toThreeColorWithAlpha(clearColor));
        updatePostProcess(threeContext.effects, postProcess, context);
        threeContext.postProcessComposer.render();
        return threeContext.imageData;
    },
};

function getTransform(camera: Camera | null) {
    if (!camera) {
        return DEFAULT_CAMERA_TRANSFORM
    } else {
        return { position: [camera.position.x, camera.position.y, camera.position.z], rotation: [toQuaternion(camera.quaternion)] }
    }
}


export function validateEffectLayer(struct: any, context: ExecutionContext) {
    return struct && typeof struct === "object" && (typeof struct.effectType === "string" && typeof (context.getNodeDefinition(struct.effectType) as any)?.add3dPostProcess === "function")
}

function validateEffectLayers(list: any, context: ExecutionContext) {
    return list.filter((a: any) => validateEffectLayer(a, context)) as PostProcessLayer[]
}

function setupPostProcess(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera, postprocess: PostProcessLayer[], context: ExecutionContext): [EffectComposer, EffectCollection] {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const effects = Object.fromEntries(postprocess.map(layer => {
        const def = context.getNodeDefinition(layer.effectType) as PostProcessNodeDefinition<any, any>;
        if (def) {
            return [layer.id, def.add3dPostProcess(layer as any, composer, camera, scene)]
        }
        return [undefined, undefined]

    })) as EffectCollection;

    return [composer, effects];
}



function updatePostProcess(effects: EffectCollection, postprocess: PostProcessLayer[], context: ExecutionContext) {
    postprocess.forEach(layer => {
        if (effects[layer.id]) {
            effects[layer.id](layer)
        }
    });
}