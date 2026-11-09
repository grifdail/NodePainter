import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const DepthPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/Depth",
    description: "Add a post process effect that render the depth of scene",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.bool("inverted", false),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const inverted = context.getInputValueBoolean(node, "inverted");

        const effect: PostProcessLayer = {
            effectType: "Depth",
            inverted
        }
        return effect;
    }
};


