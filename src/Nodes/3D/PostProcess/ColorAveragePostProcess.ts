import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { ColorAverageEffect, EffectPass } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { ColorAverageProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const ColorAverageProcessNode: PostProcessNodeDefinition<ColorAverageProcessLayer, ColorAverageEffect> = {
    id: "PostProcess3D/ColorAverage",
    description: "Add a post process effect where bright item appear to glow",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [

    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/ColorAverage",
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const colorAverageEffect = new ColorAverageEffect();
        composer.addPass(new EffectPass(camera, colorAverageEffect));
        return colorAverageEffect;
    },
};


