import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, SepiaEffect } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer, SepiaPostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";

export const SepiaPostProcessNode: PostProcessNodeDefinition<SepiaPostProcessLayer, SepiaEffect> = {
    id: "PostProcess3D/Sepia",
    description: "Add a post process effect that mimic old brownish black and white photo",
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
        const intensity = context.getInputValueNumber(node, "intensity");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/Sepia",
            intensity,
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const sepiaEffect = new SepiaEffect({ intensity: layer.intensity });
        composer.addPass(new EffectPass(camera, sepiaEffect));
        return sepiaEffect;
    },
};