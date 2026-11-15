import { AnimationSequenceData } from "../../../Utils/animationSequence/AnimationSequenceData";
import { createDefaultAnimationSequence } from "../../../Utils/animationSequence/createDefaultAnimationSequence";
import { useNodeSettingModalSave } from "../../../Hooks/useNodeSettingModalSave";
import { TimelineData } from "../../../Utils/timeline/TimelineData";

export function useAnimationSequenceModalSave() {
    return useNodeSettingModalSave<AnimationSequenceData>("animation", createDefaultAnimationSequence)
}


export function useTimelineModalSave() {
    return useNodeSettingModalSave<TimelineData>("timeline", () => ({}))
}