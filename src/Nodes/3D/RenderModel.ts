import { IconBadge3d } from "@tabler/icons-react";
import { BufferGeometry, Mesh } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector3 } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/graph/definition/createDefaultMaterial";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";
import { processMaterial } from "./Materials/createMaterialSetting";

export const RenderModel: NodeDefinition = {
    id: "3D/Model/Mesh",
    label: "Render Model",
    description: "Render a 3D Model based on a mesh and a material",
    icon: IconBadge3d,
    tags: ["3D"],
    dataInputs: [
        {
            id: "mesh",
            type: "mesh",
            defaultValue: null,
        },
        {
            id: "material",
            type: "material",
            defaultValue: createDefaultMaterial(),
        },
        {
            id: "position",
            type: "vector3",
            defaultValue: createVector3(0, 0, 0),
        },
        {
            id: "dimension",
            type: "vector3",
            defaultValue: createVector3(1, 1, 1),
        },
        {
            id: "rotation",
            type: "quaternion",
            defaultValue: [0, 0, 0, 1],
        },

    ],
    dataOutputs: [
        {
            id: "object",
            type: "object3d",
            defaultValue: null,
        },
    ],

    settings: [],
    getData(portId, node, context) {
        var material = processMaterial(context.getInputValueMaterial(node, "material"), context, node);
        var mesh = context.getInputValueMesh(node, "mesh") as BufferGeometry;
        var rotation = context.getInputValueQuaternion(node, "rotation");
        var position = context.getInputValueVector3(node, "position");
        var dimension = context.getInputValueVector3(node, "dimension");
        const element = readFromCacheWithVersion(context, node, () => {
            const self = new Mesh(undefined, undefined);
            return self;
        }, undefined, undefined, true)
        if (material !== element.material && material) {
            element.material = material || undefined;
        }
        if (mesh !== element.geometry && mesh) {
            element.geometry = mesh || undefined;
        }
        element.position.set(...position);
        element.quaternion.set(...rotation);
        element.scale.set(...dimension);
        return element;
    },
};
