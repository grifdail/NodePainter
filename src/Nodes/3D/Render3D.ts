import { IconBadge3d } from "@tabler/icons-react";
import { Camera, Scene } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor } from "../../Types/vectorDataType";
import { toQuaternion } from "../../Utils/math/quaternionUtils";
import { createThreeJSContext, DEFAULT_CAMERA_TRANSFORM } from "./VirtualNodeTypes/Render3DType";

import { readFromCache } from "../../Utils/graph/execution/blackboardCache";
import { toThreeColorWithAlpha } from "../../Utils/math/colorUtils";
import { getParamsChange } from "./getParamsChange";

export const CAMERA_3D_TRANSFORM = "camera_3d_transform"

export const Render3D: NodeDefinition = {
    id: "Render3D",
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
        { id: "width", type: "number", defaultValue: 400 },
        { id: "height", type: "number", defaultValue: 400 },
    ],
    getData(portId, node, context) {
        const width = Math.floor(node.settings.width);
        const height = Math.floor(node.settings.height);
        //Inputs
        const clearColor = context.getInputValueColor(node, "clearColor");

        let threeContext = readFromCache(context, node, () => createThreeJSContext(width, height));


        const [hasNewCamera, newCamera] = getParamsChange<Camera>(context, node, "camera", "object3d")
        if (hasNewCamera) {
            threeContext.camera = newCamera;
        }

        context.blackboard[CAMERA_3D_TRANSFORM] = getTransform(newCamera);

        const [hasNewScene, newScene, oldScene] = getParamsChange<Scene>(context, node, "scene", "object3d")

        if (hasNewScene) {
            if (oldScene) {
                threeContext.scene.remove(oldScene);
            }
            if (newScene) {
                threeContext.scene.add(newScene);
            }
        }

        threeContext.renderer.setClearColor(...toThreeColorWithAlpha(clearColor));

        const camera = threeContext.camera || threeContext.defaultCamera;

        threeContext.renderer.render(threeContext.scene, camera);


        return threeContext.imageData;
    },
};



function getTransform(camera: Camera) {
    if (!camera) {
        return DEFAULT_CAMERA_TRANSFORM
    } else {
        return { position: camera.position.toArray(), rotation: toQuaternion(camera.quaternion) }
    }
}