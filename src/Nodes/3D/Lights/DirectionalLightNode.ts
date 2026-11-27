import { IconBulb } from "@tabler/icons-react";
import { DirectionalLight } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";




export const DirectionalLightNode: NodeDefinition = {
    id: "3D/Light/DirectionalLight",
    label: "Directional Light",
    description: "A light that iluminate everything from a single direction like the sun",
    icon: IconBulb,
    tags: [
        "3D",
        "Light"
    ],
    dataInputs: [
        {
            id: "color",
            type: "color",
            defaultValue: [
                1,
                1,
                1,
                1
            ]
        },
        {
            id: "intensity",
            type: "number",
            defaultValue: 0.3
        },
        {
            id: "direction",
            type: "vector3",
            defaultValue: [
                0,
                1,
                0
            ]
        }, Port.CacheId(),
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
        const direction = context.getInputValueVector3(node, "direction");
        const light = readFromCacheWithVersion(context, node, () => {
            const self = new DirectionalLight(toThreeColor(color), intensity);
            return self;
        })
        light.color.set(toThreeColor(color));
        light.intensity = intensity;
        light.position.set(-direction[0], -direction[1], -direction[2]);
    },
};
