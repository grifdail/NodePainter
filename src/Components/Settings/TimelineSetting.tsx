import { openAnimationSequenceModal, openTimelineModal } from "../../Actions/navigationAction";
import { TimelineSettingDefinition } from "../../Types/SettingDefinition";
import { ModalSettingGenerator } from "./Generators/ModalSettingGenerator";



export const TimelineSetting = ModalSettingGenerator<TimelineSettingDefinition>(({ node }) => {
    openTimelineModal(node.id);
});
