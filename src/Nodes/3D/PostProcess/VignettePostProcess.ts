import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, VignetteEffect } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer, VignettePostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";

export const VignettePostProcessNode: PostProcessNodeDefinition<VignettePostProcessLayer, VignetteEffect> = {
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
            effectType: "PostProcess3D/Vignette",
            offset,
            darkness,
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const effect = new VignetteEffect({
            offset: layer.offset,
            darkness: layer.darkness,
        })
        composer.addPass(new EffectPass(camera, effect));
        return effect;
    },

};


