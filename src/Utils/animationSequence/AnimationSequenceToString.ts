import { CodeBlockBlocksTypes, CodeBlockExpressionTypes } from "../../CodeBlocks/CodeBlockTypes";
import { CodeBlockParameterFieldExpression } from "../../Types/CodeBlock/CodeBlockParameterFieldExpression";
import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockLoopForever, AnimationSequenceBlockLoopUntil, AnimationSequenceBlockParallel, AnimationSequenceBlockPickRandom, AnimationSequenceBlockRace, AnimationSequenceBlockReset, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockWaitUntil } from "./AnimationSequenceData";

type AnimationSequenceStringifierT = {
    [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: (model: TDefinition) => string;
};

export const AnimationSequenceToString: AnimationSequenceStringifierT = {
    Delay: function (model: AnimationSequenceBlockDelay): string {
        return `Delay by ${ev(model.duration)} s`
    },
    Lerp: function (model: AnimationSequenceBlockLerp): string {
        return `Lerp ${model.target.id} to ${ev(model.value)} over ${ev(model.duration)} s`
    },
    Loop: function (model: AnimationSequenceBlockLoop): string {
        return `Loop ${ev(model.count)} time`
    },
    LoopForever: function (model: AnimationSequenceBlockLoopForever): string {
        return `Loop Forever`
    },
    LoopUntil: function (model: AnimationSequenceBlockLoopUntil): string {
        return `Loop until ${ev(model.condition)}`;
    },
    Parallel: function (model: AnimationSequenceBlockParallel): string {
        return `Paralel`
    },
    PickRandom: function (model: AnimationSequenceBlockPickRandom): string {
        return `Pick Random`
    },
    Race: function (model: AnimationSequenceBlockRace): string {
        return `Race`
    },
    Reset: function (model: AnimationSequenceBlockReset): string {
        return `Reset all property`
    },
    Sequence: function (model: AnimationSequenceBlockSequence): string {
        return `Sequence`
    },
    Set: function (model: AnimationSequenceBlockSet): string {
        return `Set ${model.target.id} to ${ev(model.value)}`
    },
    WaitUntil: function (model: AnimationSequenceBlockWaitUntil): string {
        return `Wait until ${ev(model.condition)}`
    }
}



function ev(condition: CodeBlockParameterFieldExpression): string {
    console.log(condition, CodeBlockBlocksTypes);
    return condition.expression ? CodeBlockExpressionTypes[condition.expression.type].toString(condition.expression) : condition.constantValue.toString();
}


