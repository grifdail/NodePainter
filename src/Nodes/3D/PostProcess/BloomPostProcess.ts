import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { BloomEffect, EffectComposer, EffectPass } from "postprocessing";
import { Camera } from "three";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { BloomPostProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const BloomPostProcessNode: PostProcessNodeDefinition<BloomPostProcessLayer, BloomEffect> = {
    id: "PostProcess3D/Bloom",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("luminanceThreshold", 0.8),
        Port.number("luminanceSmoothing", 0.5),
        Port.number("intensity", 2),
        Port.number("radius", 0.5),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const luminanceThreshold = context.getInputValueNumber(node, "luminanceThreshold");
        const luminanceSmoothing = context.getInputValueNumber(node, "luminanceSmoothing");
        const radius = context.getInputValueNumber(node, "radius");
        const intensity = context.getInputValueNumber(node, "intensity");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/Bloom",
            id: node.id,
            luminanceThreshold,
            luminanceSmoothing,
            radius,
            intensity
        }
        return effect;
    },
    add3dPostProcess: function (layer: BloomPostProcessLayer, composer: EffectComposer, camera: Camera) {
        const e = new BloomEffect({
            intensity: layer.intensity,
            luminanceThreshold: layer.luminanceThreshold,
            luminanceSmoothing: layer.luminanceSmoothing,
            radius: layer.radius,
        });
        composer.addPass(new EffectPass(camera, e));
        return (layer) => {
            e.intensity = layer.intensity;
        };
    },

};


