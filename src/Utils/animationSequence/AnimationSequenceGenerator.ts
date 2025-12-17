import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockLoopForever, AnimationSequenceBlockLoopUntil, AnimationSequenceBlockParallel, AnimationSequenceBlockPickRandom, AnimationSequenceBlockRace, AnimationSequenceBlockReset, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockWaitUntil } from "./AnimationSequenceData";

type AnimationSequenceGeneratorT = { [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: () => TDefinition }

export const AnimationSequenceGenerator: AnimationSequenceGeneratorT = {
    Delay: function (): AnimationSequenceBlockDelay {
        return {
            type: "Delay",
            duration: {
                type: "expression",
                targetType: "number",
                constantValue: 1,
                expression: null
            }
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
            value: {
                type: "expression",
                targetType: "number",
                constantValue: 0,
                expression: null
            },
            duration: {
                type: "expression",
                targetType: "number",
                constantValue: 1,
                expression: null
            },
            easing: "Linear"
        };
    },
    Loop: function (): AnimationSequenceBlockLoop {
        return {
            type: "Loop",
            child: null,
            count: {
                type: "expression",
                targetType: "number",
                constantValue: 1,
                expression: null
            }
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
            value: {
                type: "expression",
                targetType: "number",
                constantValue: 0,
                expression: null
            }
        };
    },
    LoopForever: function (): AnimationSequenceBlockLoopForever {
        return {
            type: "LoopForever",
            child: null
        };
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
        };
    },
    PickRandom: function (): AnimationSequenceBlockPickRandom {
        return {
            type: "PickRandom",
            children: []
        };
    },
    Race: function (): AnimationSequenceBlockRace {
        return {
            type: "Race",
            children: []
        };
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
        };
    },
    Reset: function (): AnimationSequenceBlockReset {
        return {
            type: "Reset"
        }
    }
}