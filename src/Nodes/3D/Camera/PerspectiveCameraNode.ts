import { IconVideo } from "@tabler/icons-react";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const PerspectiveCameraNode: NodeDefinition = {
    id: "3D/Camera/PerspectiveCamera",
    label: " Perspective Camera",
    description: "A 3d camera that display object in the distance smaller",
    icon: IconVideo,
    tags: [
        "3D"
    ],
    dataInputs: [
        {
            type: "vector3",
            id: "position",
            defaultValue: [
                0,
                0,
                10
            ]
        },
        {
            type: "quaternion",
            id: "rotation",
            defaultValue: [
                0,
                0,
                0,
                1
            ]
        },
        {
            type: "number",
            id: "fov",
            defaultValue: 60
        },
        {
            type: "number",
            id: "aspectRatio",
            defaultValue: 1
        }
    ],
    dataOutputs: [
        {
            type: "object3d",
            id: "out",
            defaultValue: null
        }
    ],
    settings: [],
    getData(portId, node, context) {
        const fov = context.getInputValueNumber(node, "fov");
        const aspectRatio = context.getInputValueNumber(node, "aspectRatio");
        const position = context.getInputValueVector3(node, "position");
        const rotation = context.getInputValueVector4(node, "rotation");
        const camera = readFromCacheWithVersion(context, node, () => {
            const self = new PerspectiveCamera(fov, aspectRatio);
            return self;
        })
        camera.position.set(...position);
        camera.quaternion.set(...rotation);
        camera.fov = fov;
        camera.aspect = aspectRatio;
    },
};
