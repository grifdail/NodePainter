import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockParallel, AnimationSequenceBlockSequence, AnimationSequenceBlockSet } from "./AnimationSequenceData";

type AnimationSequenceGeneratorT = { [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: () => TDefinition }

export const AnimationSequenceGenerator: AnimationSequenceGeneratorT = {
    Delay: function (): AnimationSequenceBlockDelay {
        return {
            type: "Delay",
            duration: 1
        }
    },
    Lerp: function (): AnimationSequenceBlockLerp {
        return {
            type: "Lerp",
            target: {
                type: "number",
                location: "properties",
                id: ""
            },
            value: undefined,
            duration: 1,
            easing: "Linear"
        };
    },
    Loop: function (): AnimationSequenceBlockLoop {
        return {
            type: "Loop",
            child: null,
            count: 5
        };
    },
    Parallel: function (): AnimationSequenceBlockParallel {
        return {
            type: "Parallel",
            children: []
        };
    },
    Sequence: function (): AnimationSequenceBlockSequence {
        return {
            type: "Sequence",
            children: []
        };
    },
    Set: function (): AnimationSequenceBlockSet {
        return {
            type: "Set",
            target: {
                type: "number",
                location: "properties",
                id: ""
            },
            value: undefined
        };
    }
}