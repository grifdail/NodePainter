import { IconTexture } from "@tabler/icons-react";
import { MeshStandardMaterial } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";



export const StandardMaterialNode: NodeDefinition = {
    id: "3D/Material/StandardMaterial",
    label: " Standard Material",
    description: "Render an object with physicaly based shader",
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
        {
            id: "roughness",
            type: "number",
            defaultValue: 0.5
        },
        {
            id: "metalness",
            type: "number",
            defaultValue: 0.5
        },
        Port.CacheId(),
        Port.Version(),
    ],
    dataOutputs: [
        {
            id: "out",
            type: "material",
            defaultValue: {
                type: "FlatMaterialType",
                props: [
                    [
                        0,
                        0.5,
                        1,
                        1
                    ],
                    {
                        blendingMode: "NormalBlending",
                        transparent: false,
                        side: "FrontSide",
                        alphaTest: 0,
                        flatShading: false,
                        wireframe: false
                    }
                ],
                key: "material",
                children: {}
            }
        }
    ],
    settings: [
        createMaterialSetting()
    ],
    getData(portId, node, context) {
        const color = context.getInputValueColor(node, "color");
        const roughness = context.getInputValueNumber(node, "roughness");
        const metalness = context.getInputValueNumber(node, "metalness");
        const setting = node.settings.material;
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshStandardMaterial({ color: toThreeColor(color), roughness, metalness, ...toThreeSetting(setting) });
        })
        element.color.set(toThreeColor(color));
        element.roughness = roughness;
        element.metalness = metalness;
        updateTreeMaterial(element, setting);
        return element;
    }
};
