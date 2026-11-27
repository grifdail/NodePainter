import { IconVideo } from "@tabler/icons-react";
import { OrthographicCamera } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";

export const OrthographicCameraNode: NodeDefinition = {
    id: "3D/Camera/OrthographicCamera",
    label: " Orthographic Camera",
    description: "A 3d camera that display keep everything the same size",
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
                0
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
            id: "width",
            defaultValue: 6
        },
        {
            type: "number",
            id: "height",
            defaultValue: 6
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
        const width = context.getInputValueNumber(node, "width");
        const height = context.getInputValueNumber(node, "height");
        const position = context.getInputValueVector3(node, "position");
        const rotation = context.getInputValueVector4(node, "rotation");
        const camera = readFromCacheWithVersion(context, node, () => {
            const self = new OrthographicCamera(-width * 0.5, width * 0.5, -height * 0.5, height * 0.5);
            return self;
        })
        camera.position.set(...position);
        camera.quaternion.set(...rotation);
        camera.left = -width * 0.5;
        camera.right = width * 0.5;
        camera.top = -height * 0.5;
        camera.bottom = height * 0.5;
    },
};
