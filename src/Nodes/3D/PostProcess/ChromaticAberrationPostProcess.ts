import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { ChromaticAberrationEffect, EffectPass } from "postprocessing";
import { Vector2 } from "three";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { ChromaticAberrationPostProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const ChromaticAberrationPostProcessNode: PostProcessNodeDefinition<ChromaticAberrationPostProcessLayer, ChromaticAberrationEffect> = {
    id: "PostProcess3D/ChromaticAberration",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.vector2("offset", [0.01, 0.01]),
        Port.bool("radialModulation", true),
        Port.number("modulationOffset", 0.15)
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const offset = context.getInputValueVector2(node, "offset");
        const radialModulation = context.getInputValueBoolean(node, "radialModulation");
        const modulationOffset = context.getInputValueNumber(node, "modulationOffset");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/ChromaticAberration",
            offset,
            radialModulation,
            modulationOffset
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const effect = new ChromaticAberrationEffect({
            offset: new Vector2(...layer.offset),
            radialModulation: layer.radialModulation,
            modulationOffset: layer.modulationOffset,
        });
        composer.addPass(new EffectPass(camera, effect));
        return effect;
    },
};


