import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer } from "../../../Types/PostProcessLayer";


export const ScanlineEffectPostProcessNode: NodeDefinition = {
    id: "PostProcess3D/ScanlineEffect",
    description: "Add a post process effect that mimic scanline on old TV",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("density", 1.25),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const density = context.getInputValueNumber(node, "density");
        const effect: PostProcessLayer = {
            effectType: "ScanlineEffect",
            density
        }
        return effect;
    }
};


