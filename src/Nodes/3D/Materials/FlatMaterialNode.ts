
import { IconTexture } from "@tabler/icons-react";
import { MeshBasicMaterial } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";



export const FlatMaterialNode: NodeDefinition = {
    id: "3D/Material/FlatMaterial",
    label: " Flat Material",
    description: "Render an object with solid color, ignoring light",
    icon: IconTexture,
    tags: [
        "3D",
        "Material"
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
        Port.CacheId(),
        Port.Version(),
    ],
    dataOutputs: [
        {
            id: "out",
            type: "material",
            defaultValue: null
        }
    ],
    settings: [
        createMaterialSetting()
    ],
    getData(portId, node, context) {
        const color = context.getInputValueColor(node, "color");
        const setting = node.settings.material;
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshBasicMaterial({ color: toThreeColor(color), ...toThreeSetting(setting) });
        })
        element.color.set(toThreeColor(color));
        updateTreeMaterial(element, setting);
        return element;
    },
};
