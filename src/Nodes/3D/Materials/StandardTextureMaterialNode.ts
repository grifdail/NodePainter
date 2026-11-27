import { IconTexture } from "@tabler/icons-react";
import { Material, MeshStandardMaterial, Texture } from "three";
import { ImageData } from "../../../Types/ImageData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { toThreeColor, White } from "../../../Utils/math/colorUtils";
import { createMaterialSetting, toThreeSetting, updateTreeMaterial } from "./createMaterialSetting";

export const StandardTextureMaterialNode: NodeDefinition = {
    id: "3D/Material/StandardTextureMaterial",
    label: " Standard Texture Material",
    description: "Render an object with physicaly based shader",
    icon: IconTexture,
    tags: [
        "3D",
        "Material"
    ],
    dataInputs: [
        Port.color("color", White()),
        Port.image("colorTexture"),
        Port.number("roughness", 0.5),
        Port.image("roughnessTexture"),
        Port.number("metalness", 0.5),
        Port.image("metalnessTexture"),
        Port.image("normalTexture"),
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
        const colorTexture = context.getInputValue<ImageData>(node, "colorTexture", "image");
        const roughnessTexture = context.getInputValue<ImageData>(node, "roughnessTexture", "image");
        const metalnessTexture = context.getInputValue<ImageData>(node, "metalnessTexture", "image");
        const normalTexture = context.getInputValue<ImageData>(node, "normalTexture", "image");
        const setting = node.settings.material;
        const roughness = context.getInputValueNumber(node, "roughness");
        const metalness = context.getInputValueNumber(node, "metalness");
        const element = readFromCacheWithVersion(context, node, () => {
            return new MeshStandardMaterial({
                color: toThreeColor(color),
                roughness,
                metalness,
                map: colorTexture?.getThreeJs(),
                roughnessMap: roughnessTexture?.getThreeJs(),
                metalnessMap: metalnessTexture?.getThreeJs(),
                normalMap: normalTexture?.getThreeJs(),
                ...toThreeSetting(setting),
            });
        })
        element.color.set(toThreeColor(color));
        element.roughness = roughness;
        element.metalness = metalness;
        setMaterial(element, "map", colorTexture?.getThreeJs());
        setMaterial(element, "roughnessMap", roughnessTexture?.getThreeJs());
        setMaterial(element, "metalnessMap", metalnessTexture?.getThreeJs());
        setMaterial(element, "normalMap", normalTexture?.getThreeJs());
        updateTreeMaterial(element, setting);
        return element;
    }
};

function setMaterial<T extends Material>(mat: T, props: keyof T, value: Texture | null) {
    var old = mat[props];
    if (old !== value) {
        mat[props] = value as any;
        mat.needsUpdate = true;
    }
}