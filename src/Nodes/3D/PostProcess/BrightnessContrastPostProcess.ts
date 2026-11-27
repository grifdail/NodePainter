import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { BrightnessContrastEffect, EffectPass } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { BrightnessContrastProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const BrightnessContrastPostProcessNode: PostProcessNodeDefinition<BrightnessContrastProcessLayer, BrightnessContrastEffect> = {
    id: "PostProcess3D/BrightnessContrast",
    description: "Add a post process effect that let you change the brightness and contrast of the image",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("brightness", 0),
        Port.number("contrast", 0),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const brightness = context.getInputValueNumber(node, "brightness");
        const contrast = context.getInputValueNumber(node, "contrast");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/BrightnessContrast",
            brightness,
            contrast
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const brightnessContrastEffect = new BrightnessContrastEffect({
            brightness: layer.brightness,
            contrast: layer.contrast,
        });
        composer.addPass(new EffectPass(camera, brightnessContrastEffect));
        return brightnessContrastEffect;
    },
};


