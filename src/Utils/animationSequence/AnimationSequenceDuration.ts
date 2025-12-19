import { CodeBlockParameterFieldExpression } from "../../Types/CodeBlock/CodeBlockParameterFieldExpression";
import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockLoopForever, AnimationSequenceBlockLoopUntil, AnimationSequenceBlockParallel, AnimationSequenceBlockPickRandom, AnimationSequenceBlockRace, AnimationSequenceBlockReset, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockWaitUntil } from "./AnimationSequenceData";

type AnimationSequenceDurationEval = {
    [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: (model: TDefinition) => [number, boolean];
};

export const AnimationSequenceEvalDuration: AnimationSequenceDurationEval = {
    Delay: function (model: AnimationSequenceBlockDelay): [number, boolean] {
        return evalVariable(model.duration);
    },
    Lerp: function (model: AnimationSequenceBlockLerp): [number, boolean] {
        return evalVariable(model.duration);
    },
    Loop: function (model: AnimationSequenceBlockLoop): [number, boolean] {
        var value = model.child ? evalASBlockDuration(model.child) : [0, false] as [number, boolean]
        var count = evalVariable(model.count);
        return [value[0] * count[0], count[1] || value[1]]
    },
    LoopForever: function (model: AnimationSequenceBlockLoopForever): [number, boolean] {
        return [Infinity, false]
    },
    LoopUntil: function (model: AnimationSequenceBlockLoopUntil): [number, boolean] {
        return [Infinity, true]
    },
    Parallel: function (model: AnimationSequenceBlockParallel): [number, boolean] {
        var children = model.children.map(evalASBlockDuration);
        return children.reduce((old, n) => [Math.max(old[0], n[0]), old[1] || n[1]], [0, false])
    },
    PickRandom: function (model: AnimationSequenceBlockPickRandom): [number, boolean] {
        var children = model.children.map(evalASBlockDuration);
        return children.reduce((old, n) => [Math.max(old[0], n[0]), true], [0, false])
    },
    Race: function (model: AnimationSequenceBlockRace): [number, boolean] {
        var children = model.children.map(evalASBlockDuration);
        return children.reduce((old, n) => [Math.min(old[0], n[0]), old[1] || n[1]], [Infinity, false])
    },
    Reset: function (model: AnimationSequenceBlockReset): [number, boolean] {
        return [0, false]
    },
    Sequence: function (model: AnimationSequenceBlockSequence): [number, boolean] {
        var children = model.children.map(evalASBlockDuration);
        return children.reduce((old, n) => [old[0] + n[0], old[1] || n[1]], [0, false])
    },
    Set: function (model: AnimationSequenceBlockSet): [number, boolean] {
        return [0, false]
    },
    WaitUntil: function (model: AnimationSequenceBlockWaitUntil): [number, boolean] {
        return [Infinity, true]
    }
}



function evalVariable(condition: CodeBlockParameterFieldExpression): [number, boolean] {
    return condition.expression ? [0, true] : [condition.constantValue as number, false];
}

export const evalASBlockDuration = (block: AnimationSequenceBlock) => {
    return AnimationSequenceEvalDuration[block.type](block as any)
}
