import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { FogPostProcessLayer } from "../../../Types/PostProcessLayer";
import { White } from "../../../Utils/math/colorUtils";


export const FogPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/Fog",
    description: "Add a post process effect where item in the back get mixed with a color",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("min", 0),
        Port.number("max", 20),
        Port.color("color", White()),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const c = context.getInputValueColor(node, "color")
        const min = context.getInputValueNumber(node, "min");
        const max = context.getInputValueNumber(node, "max");
        const effect: FogPostProcessLayer = {
            effectType: "Fog",
            minRange: min,
            maxRange: max,
            colorStart: c,
            colorEnd: c
        }
        return effect;
    }
};
