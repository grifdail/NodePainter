import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const ToneMappingPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/ToneMapping",
    description: "Add a post process effect that adjust the image according to specific preset",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("resolution", 256),
        Port.number("whitePoint", 4),
        Port.number("middleGrey", 0.6),
        Port.number("minLuminance", 0.01),
        Port.number("averageLuminance", 1),
        Port.number("adaptationRate", 1),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const resolution = context.getInputValueNumber(node, "resolution");
        const whitePoint = context.getInputValueNumber(node, "whitePoint");
        const middleGrey = context.getInputValueNumber(node, "middleGrey");
        const minLuminance = context.getInputValueNumber(node, "minLuminance");
        const averageLuminance = context.getInputValueNumber(node, "averageLuminance");
        const adaptationRate = context.getInputValueNumber(node, "adaptationRate");
        const effect: PostProcessLayer = {
            effectType: "ToneMapping",
            resolution,
            whitePoint,
            middleGrey,
            minLuminance,
            averageLuminance,
            adaptationRate
        }
        return effect;
    }
};


