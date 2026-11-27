import { IconTexture } from "@tabler/icons-react";
import { MeshLambertMaterial } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";



export const LambertMaterialNode: NodeDefinition = {
    id: "3D/Material/LambertMaterial",
    label: " Lambert Material",
    description: "Render an object with a very basic light model",
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
            id: "emissive",
            type: "color",
            defaultValue: [
                0,
                0,
                0,
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
        const emissive = context.getInputValueColor(node, "color");
        const setting = node.settings.material;
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshLambertMaterial({ color: toThreeColor(color), emissive: toThreeColor(emissive), ...toThreeSetting(setting) });
        })
        element.color.set(toThreeColor(color));
        element.emissive.set(toThreeColor(emissive));
        updateTreeMaterial(element, setting);
        return element;
    }
};


