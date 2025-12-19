import { openAnimationSequenceModal } from "../../Actions/navigationAction";
import { AnimationSequenceSettingDefinition } from "../../Types/SettingDefinition";
import { ModalSettingGenerator } from "./Generators/ModalSettingGenerator";


export const AnimationSequenceSetting = ModalSettingGenerator<AnimationSequenceSettingDefinition>(({ node }) => {
    openAnimationSequenceModal(node.id)
});