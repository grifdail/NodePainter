import { AllEasing } from "../../libs/easing";
import { CodeBlockParameterFieldExpression } from "../../Types/CodeBlock/CodeBlockParameterFieldExpression";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { evaluateCodeBlockExpression } from "../codeblock/evaluateCodeBlockExpression";
import { FunctionContext } from "../graph/execution/createExecutionContext";
import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockLoopForever, AnimationSequenceBlockLoopUntil, AnimationSequenceBlockParallel, AnimationSequenceBlockPickRandom, AnimationSequenceBlockRace, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockWaitUntil } from "./AnimationSequenceData";

type AnimationSequenceRunnerT = {
    [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: (model: TDefinition, properties: FunctionContext) => Generator<void, void, [FunctionContext, number]>;
};

export const AnimationSequenceRunner: AnimationSequenceRunnerT = {
    Delay: function* (model: AnimationSequenceBlockDelay, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        let timer = 0;
        while (timer < model.duration) {
            const [, dt] = yield;
            timer += dt;
        }
    },
    Lerp: function* (model: AnimationSequenceBlockLerp, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        if (!model.target.id || !(model.target.id in properties)) {
            throw new Error(`target "${model.target.id}" is undefined`);
        }
        const interpolator = PortTypeDefinitions[model.target.type]?.lerpOperator;
        if (interpolator === undefined) {
            throw new Error(`${model.target.type} of property ${model.target.id} is not lerpable.`);
        }
        let timer = 0;

        const startValue = properties[model.target.id].value;
        while (timer < model.duration) {
            const [, dt] = yield;

            const t = timer / model.duration;
            const tt = AllEasing[model.easing](t);
            properties[model.target.id].value = interpolator(startValue, model.value, tt);


            timer += dt;
        }
        properties[model.target.id].value = model.value;
    },
    Loop: function* (model: AnimationSequenceBlockLoop, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        if (model.child === null) {

            throw new Error(`No animation to execute inside the loop animation`);
        }
        for (let i = 0; i < model.count; i++) {
            yield* createRunnerForBlock(model.child, properties);
        }
    },
    Parallel: function* (model: AnimationSequenceBlockParallel, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        const children = model.children.map(child => createRunnerForBlock(child, properties));
        let isDone = true;
        do {
            isDone = true;
            const parameters = yield;
            for (const child of children) {
                const result = child.next(parameters);
                isDone = isDone && !!result.done;
            }
        }
        while (!isDone);


    },
    Sequence: function* (model: AnimationSequenceBlockSequence, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {

        for (const child of model.children) {
            yield* createRunnerForBlock(child, properties);
        }
        return;
    },
    Set: function* (model: AnimationSequenceBlockSet, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        if (!model.target.id || !(model.target.id in properties)) {
            throw new Error(`${model.target.id} is undefined`);
        }
        properties[model.target.id].value = model.value;
    },
    LoopForever: function* (model: AnimationSequenceBlockLoopForever, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        if (model.child === null) {

            throw new Error(`No animation to execute inside the loop animation`);
        }
        while (true) {
            yield* createRunnerForBlock(model.child, properties);
        }
    },
    LoopUntil: function* (model: AnimationSequenceBlockLoopUntil, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        if (model.child === null) {

            throw new Error(`No animation to execute inside the loop animation`);
        }
        do {
            const [inputs,] = yield;
            if (!evalCondition(model.condition, properties, inputs)) {
                break;
            }
            yield* createRunnerForBlock(model.child, properties);
        }
        while (true);
    },
    PickRandom: function* (model: AnimationSequenceBlockPickRandom, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        if (model.children.length === 0) {
            return;
        }
        const option = Math.floor(Math.random() * model.children.length);
        yield* createRunnerForBlock(model.children[option], properties);
        return;
    },
    WaitUntil: function* (model: AnimationSequenceBlockWaitUntil, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        do {
            const [inputs,] = yield;
            if (!evalCondition(model.condition, properties, inputs)) {
                break;
            }
        }
        while (true);
    },
    Race: function* (model: AnimationSequenceBlockRace, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
        const children = model.children.map(child => createRunnerForBlock(child, properties));
        let isDone = true;
        do {
            isDone = true;
            const parameters = yield;
            for (const child of children) {
                const result = child.next(parameters);
                isDone = isDone || !!result.done;
            }
        }
        while (!isDone);
    }
}

export function createRunnerForBlock(model: AnimationSequenceBlock, properties: FunctionContext): Generator<void, void, [FunctionContext, number]> {
    return AnimationSequenceRunner[model.type](model as any, properties)
}


function evalCondition(condition: CodeBlockParameterFieldExpression, properties: FunctionContext, inputs: FunctionContext): boolean {
    return evaluateCodeBlockExpression(condition, { ...inputs, ...properties })
}

