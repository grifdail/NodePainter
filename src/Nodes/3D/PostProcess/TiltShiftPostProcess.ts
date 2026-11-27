import { IconBadge3d, IconPhoto } from "@tabler/icons-react";
import { EffectPass, TiltShiftEffect } from "postprocessing";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { Port } from "../../../Types/PortTypeGenerator";
import { PostProcessLayer, TiltShiftPostProcessLayer } from "../../../Types/PostProcessLayer";
import { PostProcessNodeDefinition } from "../../../Types/PostProcessNodeDefinition";


export const TiltShiftPostProcessNode: PostProcessNodeDefinition<TiltShiftPostProcessLayer, TiltShiftEffect> = {
    id: "PostProcess3D/TiltShift",
    description: "Add a post process effect that focus a specific area to mimic camera tilt shift",
    icon: DoubleIconGen(IconPhoto, IconBadge3d),
    tags: ["3D", "PostProcess"],
    dataInputs: [
        Port.number("offset", 0),
        Port.number("rotation", 0),
        Port.number("focusArea", 0.4),
        Port.number("feather", 0.3),
    ],
    dataOutputs: [
        Port.struct("effect")
    ],
    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const offset = context.getInputValueNumber(node, "offset");
        const rotation = context.getInputValueNumber(node, "rotation");
        const focusArea = context.getInputValueNumber(node, "focusArea");
        const feather = context.getInputValueNumber(node, "feather");
        const effect: PostProcessLayer = {
            effectType: "PostProcess3D/TiltShift",
            offset,
            rotation,
            focusArea,
            feather
        }
        return effect;
    },
    add3dPostProcess(layer, composer, camera, scene) {
        const tiltShiftEffect = new TiltShiftEffect({
            offset: layer.offset,
            rotation: layer.rotation,
            focusArea: layer.focusArea,
            feather: layer.feather,
        });
        composer.addPass(new EffectPass(camera, tiltShiftEffect));
        return tiltShiftEffect;
    },
};


