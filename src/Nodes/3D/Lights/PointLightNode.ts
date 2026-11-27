import { IconBulb } from "@tabler/icons-react";
import { PointLight } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";


export const PointLightNode: NodeDefinition = {
    id: "3D/Light/PointLight",
    label: "Point Light",
    description: "A light emiting in all direction from a source",
    icon: IconBulb,
    tags: ["3D", "Light"],
    dataInputs: [
        {
            id: "color",
            type: "color",
            defaultValue: [1, 1, 1, 1]
        },
        {
            id: "intensity",
            type: "number",
            defaultValue: 0.3
        },
        {
            id: "position",
            type: "vector3",
            defaultValue: [0, 0, 0]
        },
        {
            id: "distance",
            type: "number",
            defaultValue: 0
        },
        {
            id: "decay",
            type: "number",
            defaultValue: 2
        },
        Port.CacheId(),
        Port.Version(),
    ],
    dataOutputs: [
        {
            id: "out",
            type: "object3d",
            defaultValue: null
        }
    ],
    settings: [],
    getData(portId, node, context) {
        const color = context.getInputValueColor(node, "color");
        const intensity = context.getInputValueNumber(node, "intensity");
        const position = context.getInputValueVector3(node, "position");
        const distance = context.getInputValueNumber(node, "distance");
        const decay = context.getInputValueNumber(node, "decay");
        const light = readFromCacheWithVersion(context, node, () => {
            const self = new PointLight(toThreeColor(color), intensity);
            return self;
        })
        light.color.set(toThreeColor(color));
        light.intensity = intensity;
        light.position.set(...position);
        light.distance = distance;
        light.decay = decay;
    },
};
