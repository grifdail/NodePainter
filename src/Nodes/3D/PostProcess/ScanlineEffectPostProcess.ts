import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, ScanlineEffect } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer, ScanlineEffectPostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const ScanlineEffectPostProcessNode: PostProcessNodeDefinition<ScanlineEffectPostProcessLayer, ScanlineEffect> = {
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
            effectType: "PostProcess3D/ScanlineEffect",
            id: node.id,
            density
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const scanlineEffect = new ScanlineEffect({
            density: layer.density,
        });
        composer.addPass(new EffectPass(camera, scanlineEffect));
        return (layer) => {
            scanlineEffect.density = layer.density;
        };
    },
};


