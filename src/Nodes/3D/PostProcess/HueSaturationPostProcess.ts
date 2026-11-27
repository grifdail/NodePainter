import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, HueSaturationEffect } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { HueSaturationPostProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const HueSaturationPostProcessNode: PostProcessNodeDefinition<HueSaturationPostProcessLayer, HueSaturationEffect> = {
    id: "PostProcess3D/HueSaturation",
    description: "Add a post process effect that let you adjust the hue and saturation of the colors",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("hue", 0),
        Port.number("saturation", 0),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const hue = context.getInputValueNumber(node, "hue");
        const saturation = context.getInputValueNumber(node, "saturation");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/HueSaturation",
            id: node.id,
            hue,
            saturation,
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const hueSaturationEffect = new HueSaturationEffect({
            hue: layer.hue,
            saturation: layer.saturation
        });
        composer.addPass(new EffectPass(camera, hueSaturationEffect));
        return (layer) => {
            hueSaturationEffect.hue = layer.hue;
            hueSaturationEffect.saturation = layer.saturation;
        };
    },
};


