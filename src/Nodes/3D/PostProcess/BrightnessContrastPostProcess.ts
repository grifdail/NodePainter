import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const BrightnessContrastPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/BrightnessContrast",
    description: "Add a post process effect that let you change the brightness and contrast of the image",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("brightness", 0),
        Port.number("contrast", 0),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const brightness = context.getInputValueNumber(node, "brightness");
        const contrast = context.getInputValueNumber(node, "contrast");
        const effect: PostProcessLayer = {
            effectType: "BrightnessContrast",
            brightness,
            contrast
        }
        return effect;
    }
};


