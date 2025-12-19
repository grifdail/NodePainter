import { nanoid } from "nanoid";
import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockLoopForever, AnimationSequenceBlockLoopUntil, AnimationSequenceBlockParallel, AnimationSequenceBlockPickRandom, AnimationSequenceBlockRace, AnimationSequenceBlockReset, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockWaitUntil } from "./AnimationSequenceData";

type AnimationSequenceGeneratorT = { [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: () => TDefinition }

export const AnimationSequenceGenerator: AnimationSequenceGeneratorT = {
    Delay: function (): AnimationSequenceBlockDelay {
        return {
            id: nanoid(),
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
            id: nanoid(),
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
            id: nanoid(),
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
            id: nanoid(),
            type: "Parallel",
            children: []
        };
    },
    Sequence: function (): AnimationSequenceBlockSequence {
        return {
            id: nanoid(),
            type: "Sequence",
            children: []
        };
    },
    Set: function (): AnimationSequenceBlockSet {
        return {
            id: nanoid(),
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
            id: nanoid(),
            type: "LoopForever",
            child: null
        };
    },
    LoopUntil: function (): AnimationSequenceBlockLoopUntil {
        return {
            id: nanoid(),
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
            id: nanoid(),
            type: "PickRandom",
            children: []
        };
    },
    Race: function (): AnimationSequenceBlockRace {
        return {
            id: nanoid(),
            type: "Race",
            children: []
        };
    },
    WaitUntil: function (): AnimationSequenceBlockWaitUntil {
        return {
            id: nanoid(),
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
            id: nanoid(),
            type: "Reset"
        }
    }
}