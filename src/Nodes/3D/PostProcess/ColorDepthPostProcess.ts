import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";
import { Constraints } from "../../../Utils/ui/applyConstraints";


export const ColorDepthPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/ColorDepth",
    description: "Add a post process effect that reduce the bits of a color to smaller value",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("bits", 1, [Constraints.Integer(), Constraints.GreaterThan(1)]),

    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const bits = context.getInputValueNumber(node, "bits");
        const effect: PostProcessLayer = {
            effectType: "ColorDepth",
            bits
        }
        return effect;
    }
};


