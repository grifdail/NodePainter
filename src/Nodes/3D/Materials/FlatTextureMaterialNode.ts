
import { IconTexture } from "@tabler/icons-react";
import { MeshBasicMaterial } from "three";
import { ImageData } from "../../../Types/ImageData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor } from "../../../Utils/math/colorUtils";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";



export const FlatTextureMaterialNode: NodeDefinition = {
    id: "3D/Material/FlatTextureMaterial",
    label: " Flat Texture Material",
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
        {
            type: "image",
            id: "texture",
            defaultValue: null
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
        const texture = context.getInputValue<ImageData>(node, "texture", "image");
        const setting = node.settings.material;
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshBasicMaterial({ color: toThreeColor(color), map: texture?.getThreeJs(), ...toThreeSetting(setting) });
        })
        element.color.set(toThreeColor(color));
        const oldMap = element.map;
        element.map = texture?.getThreeJs();
        element.wireframeLinewidth = 5;
        if (element.map !== oldMap) {
            element.needsUpdate = true;
        }
        updateTreeMaterial(element, setting);
        return element;
    }
};
