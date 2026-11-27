import { IconBulb } from "@tabler/icons-react";
import { AmbientLight } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";




export const AmbientLightNode: NodeDefinition = {
    id: "3D/Light/AmbientLight",
    label: "Ambient Light",
    description: "Light the whole scene uniformely, from all direction",
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
        const light = readFromCacheWithVersion(context, node, () => {
            const self = new AmbientLight(toThreeColor(color), intensity);
            return self;
        })
        light.color.set(toThreeColor(color));
        light.intensity = intensity;
    },
};
