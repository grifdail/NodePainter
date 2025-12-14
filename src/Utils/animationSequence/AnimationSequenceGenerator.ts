import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockLoopForever, AnimationSequenceBlockLoopUntil, AnimationSequenceBlockParallel, AnimationSequenceBlockPickRandom, AnimationSequenceBlockRace, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockWaitUntil } from "./AnimationSequenceData";

type AnimationSequenceGeneratorT = { [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: () => TDefinition }

export const AnimationSequenceGenerator: AnimationSequenceGeneratorT = {
    Delay: function (): AnimationSequenceBlockDelay {
        return {
            type: "Delay",
            duration: 1
        };
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
    },
    LoopForever: function (): AnimationSequenceBlockLoopForever {
        return {
            type: "LoopForever",
            child: null
        }
    },
    LoopUntil: function (): AnimationSequenceBlockLoopUntil {
        return {
            type: "LoopUntil",
            child: null,
            condition: {
                type: "expression",
                targetType: "bool",
                constantValue: undefined,
                expression: null
            }
        }
    },
    PickRandom: function (): AnimationSequenceBlockPickRandom {
        return {
            type: "PickRandom",
            children: []
        }
    },
    Race: function (): AnimationSequenceBlockRace {
        return {
            type: "Race",
            children: []
        }
    },
    WaitUntil: function (): AnimationSequenceBlockWaitUntil {
        return {
            type: "WaitUntil",
            condition: {
                type: "expression",
                targetType: "bool",
                constantValue: false,
                expression: null
            }
        }
    }
}