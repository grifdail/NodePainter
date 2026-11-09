import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const HueSaturationPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/HueSaturation",
    description: "Add a post process effect that let you adjust the hue and saturation of the colors",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("hue", 0),
        Port.number("saturation", 0),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const hue = context.getInputValueNumber(node, "hue");
        const saturation = context.getInputValueNumber(node, "saturation");
        const effect: PostProcessLayer = {
            effectType: "HueSaturation",
            hue,
            saturation,
        }
        return effect;
    }
};


