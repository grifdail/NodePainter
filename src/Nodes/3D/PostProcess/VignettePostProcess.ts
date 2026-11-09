import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";

export const VignettePostProcessNode: NodeDefinition = {
    id: "PostProcess3D/Vignette",
    description: "Add a post process effect that darkend conner of the image",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("offset", 0),
        Port.number("darkness", 0),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const offset = context.getInputValueNumber(node, "offset");
        const darkness = context.getInputValueNumber(node, "darkness");
        const effect: PostProcessLayer = {
            effectType: "Vignette",
            offset,
            darkness,
        }
        return effect;
    }
};


