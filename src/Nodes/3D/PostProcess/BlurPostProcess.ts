import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { KawaseBlurPass } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { BlurPostProcessLayer, PostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const BlurPostProcessNode: PostProcessNodeDefinition<BlurPostProcessLayer, KawaseBlurPass> = {
    id: "PostProcess3D/Blur",
    description: "Add a post process effect that blur the entire Image",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("intensity", 1),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {

        //const intensity = context.getInputValueNumber(node, "intensity");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/Blur",

        }
        return effect;
    },

    add3dPostProcess(layer, composer, camera, scene) {
        const a = new KawaseBlurPass({})
        composer.addPass(a);
        return a;
    },
};


