import { IconTexture } from "@tabler/icons-react";
import { MeshDepthMaterial, RGBDepthPacking } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";



export const DepthMaterialNode: NodeDefinition = {
    id: "3D/Material/DepthMaterial",
    label: " Depth Material",
    description: "Render an object to display their depth relative to the camera",
    icon: IconTexture,
    tags: [
        "3D",
        "Material"
    ],
    dataInputs: [
        Port.CacheId(),
        Port.Version(),],
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
        const setting = node.settings.material;
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshDepthMaterial({ depthPacking: RGBDepthPacking, ...toThreeSetting(setting) });
        })
        updateTreeMaterial(element, setting);
        return element;
    }
};
