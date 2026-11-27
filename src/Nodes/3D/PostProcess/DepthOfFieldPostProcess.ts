import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { DepthOfFieldEffect, EffectPass } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { DepthOfFieldPostProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const DepthOfFieldPostProcessNode: PostProcessNodeDefinition<DepthOfFieldPostProcessLayer, DepthOfFieldEffect> = {
    id: "PostProcess3D/DepthOfField",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("focusDistance", 5),
        Port.number("focusRange", 5),
        Port.number("bokehScale", 1),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const focusDistance = context.getInputValueNumber(node, "focusDistance");
        const focusRange = context.getInputValueNumber(node, "focusRange");
        const bokehScale = context.getInputValueNumber(node, "bokehScale");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/DepthOfField",
            id: node.id,
            focusDistance,
            focusRange,
            bokehScale,
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
            focusDistance: layer.focusDistance,
            focusRange: layer.focusRange,
            bokehScale: layer.bokehScale,
        });
        composer.addPass(new EffectPass(camera, depthOfFieldEffect));
        return (layer) => {
            depthOfFieldEffect.bokehScale = layer.bokehScale;
        };
    },
};


