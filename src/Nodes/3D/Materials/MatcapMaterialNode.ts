import { IconTexture } from "@tabler/icons-react";
import { MeshMatcapMaterial } from "three";
import { ImageData } from "../../../Types/ImageData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";



export const MatcapMaterialNode: NodeDefinition = {
    id: "3D/Material/MatcapMaterial",
    label: " Matcap Material",
    description: "Render an material using a Matcap texture",
    icon: IconTexture,
    tags: [
        "3D",
        "Material"
    ],
    dataInputs: [
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
        const texture = context.getInputValue<ImageData>(node, "texture", "image");
        const setting = node.settings.material;
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshMatcapMaterial({ matcap: texture?.getThreeJs(), ...toThreeSetting(setting) });
        })
        const oldMap = element.map;
        element.matcap = texture?.getThreeJs();
        if (element.matcap !== oldMap) {
            element.needsUpdate = true;
        }
        updateTreeMaterial(element, setting);
        return element;
    }
};
