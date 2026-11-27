import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, ToneMappingEffect } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer, ToneMappingPostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const ToneMappingPostProcessNode: PostProcessNodeDefinition<ToneMappingPostProcessLayer, ToneMappingEffect> = {
    id: "PostProcess3D/ToneMapping",
    description: "Add a post process effect that adjust the image according to specific preset",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("resolution", 256),
        Port.number("whitePoint", 4),
        Port.number("middleGrey", 0.6),
        Port.number("minLuminance", 0.01),
        Port.number("averageLuminance", 1),
        Port.number("adaptationRate", 1),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const resolution = context.getInputValueNumber(node, "resolution");
        const whitePoint = context.getInputValueNumber(node, "whitePoint");
        const middleGrey = context.getInputValueNumber(node, "middleGrey");
        const minLuminance = context.getInputValueNumber(node, "minLuminance");
        const averageLuminance = context.getInputValueNumber(node, "averageLuminance");
        const adaptationRate = context.getInputValueNumber(node, "adaptationRate");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/ToneMapping",
            id: node.id,
            resolution,
            whitePoint,
            middleGrey,
            minLuminance,
            averageLuminance,
            adaptationRate
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const toneMappingEffect = new ToneMappingEffect({
            resolution: layer.resolution,
            whitePoint: layer.whitePoint,
            middleGrey: layer.middleGrey,
            minLuminance: layer.minLuminance,
            averageLuminance: layer.averageLuminance,
            adaptationRate: layer.adaptationRate,
        });
        composer.addPass(new EffectPass(camera, toneMappingEffect));
        return (layer) => {
            toneMappingEffect.resolution = layer.resolution;
            toneMappingEffect.adaptationRate = layer.adaptationRate;
        };
    },
};


