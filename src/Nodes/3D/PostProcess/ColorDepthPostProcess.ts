import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { ColorDepthEffect, EffectPass } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { ColorDepthProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";
import { Constraints } from "../../../Utils/ui/applyConstraints";


export const ColorDepthPostProcessNode: PostProcessNodeDefinition<ColorDepthProcessLayer, ColorDepthEffect> = {
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
            effectType: "PostProcess3D/ColorDepth",
            id: node.id,
            bits
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const colorDepthEffect = new ColorDepthEffect({
            bits: layer.bits
        });
        composer.addPass(new EffectPass(camera, colorDepthEffect));
        return (layer) => {
            colorDepthEffect.bitDepth = layer.bits;
        };
    },
};


