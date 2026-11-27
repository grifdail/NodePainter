import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, LensDistortionEffect } from "postprocessing";
import { Vector2 } from "three";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { LensDistortionPostProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const LensDistortionPostProcessNode: PostProcessNodeDefinition<LensDistortionPostProcessLayer, LensDistortionEffect> = {
    id: "PostProcess3D/LensDistortion",
    description: "Add a post process effect that mimic the distortion of a lens in a old camera.",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.vector2("distortion", [0.1, 0.1]),
        Port.vector2("principalPoint", [0, 0]),
        Port.vector2("focalLength", [0.8, 0.8]),
        Port.number("skew", 0),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const distortion = context.getInputValueVector2(node, "distortion");
        const principalPoint = context.getInputValueVector2(node, "principalPoint");
        const focalLength = context.getInputValueVector2(node, "focalLength");
        const skew = context.getInputValueNumber(node, "skew");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/LensDistortion",
            distortion,
            principalPoint,
            focalLength,
            skew
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const lensDistortionEffect = new LensDistortionEffect({
            distortion: new Vector2(...layer.distortion),
            principalPoint: new Vector2(...layer.principalPoint),
            focalLength: new Vector2(...layer.focalLength),
            skew: layer.skew,
        });
        composer.addPass(new EffectPass(camera, lensDistortionEffect));
        return lensDistortionEffect;
    },
};


