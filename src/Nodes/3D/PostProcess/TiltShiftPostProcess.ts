import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const TiltShiftPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/TiltShift",
    description: "Add a post process effect that focus a specific area to mimic camera tilt shift",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("offset", 0),
        Port.number("rotation", 0),
        Port.number("focusArea", 0.4),
        Port.number("feather", 0.3),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const offset = context.getInputValueNumber(node, "offset");
        const rotation = context.getInputValueNumber(node, "rotation");
        const focusArea = context.getInputValueNumber(node, "focusArea");
        const feather = context.getInputValueNumber(node, "feather");
        const effect: PostProcessLayer = {
            effectType: "TiltShift",
            offset,
            rotation,
            focusArea,
            feather
        }
        return effect;
    }
};


