import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const ChromaticAberrationPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/ChromaticAberration",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.vector2("offset", [0.01, 0.01]),
        Port.bool("radialModulation", true),
        Port.number("modulationOffset", 0.15)
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const offset = context.getInputValueVector2(node, "offset");
        const radialModulation = context.getInputValueBoolean(node, "radialModulation");
        const modulationOffset = context.getInputValueNumber(node, "modulationOffset");
        const effect: PostProcessLayer = {
            effectType: "ChromaticAberration",
            offset,
            radialModulation,
            modulationOffset
        }
        return effect;
    }
};


