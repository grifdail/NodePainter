import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const BloomPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/Bloom",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("luminanceThreshold", 0.8),
        Port.number("luminanceSmoothing", 0.5),
        Port.number("intensity", 2),
        Port.number("radius", 0.5),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const luminanceThreshold = context.getInputValueNumber(node, "luminanceThreshold");
        const luminanceSmoothing = context.getInputValueNumber(node, "luminanceSmoothing");
        const radius = context.getInputValueNumber(node, "radius");
        const intensity = context.getInputValueNumber(node, "intensity");
        const effect: PostProcessLayer = {
            effectType: "Bloom",
            luminanceThreshold,
            luminanceSmoothing,
            radius,
            intensity
        }
        return effect;
    }
};


