import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const BlurPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/Blur",
    description: "Add a post process effect that blur the entire Image",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("intensity", 1),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {

        //const intensity = context.getInputValueNumber(node, "intensity");
        const effect: PostProcessLayer = {
            effectType: "Blur",

        }
        return effect;
    }
};


