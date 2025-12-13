import { AnimationSequenceData } from "./AnimationSequenceData";
import { AnimationSequenceGenerator } from "./AnimationSequenceGenerator";


export const createDefaultAnimationSequence = (): AnimationSequenceData => {
    return {
        root: AnimationSequenceGenerator.Sequence(),
        inputVariables: [],
        properties: [],
    };
};



