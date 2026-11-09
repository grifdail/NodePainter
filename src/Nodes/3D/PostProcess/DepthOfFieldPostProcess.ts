import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const DepthOfFieldPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/DepthOfField",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("focusDistance", 5),
        Port.number("focusRange", 5),
        Port.number("bokehScale", 1),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const focusDistance = context.getInputValueNumber(node, "focusDistance");
        const focusRange = context.getInputValueNumber(node, "focusRange");
        const bokehScale = context.getInputValueNumber(node, "bokehScale");
        const effect: PostProcessLayer = {
            effectType: "DepthOfField",
            focusDistance,
            focusRange,
            bokehScale,
        }
        return effect;
    }
};


