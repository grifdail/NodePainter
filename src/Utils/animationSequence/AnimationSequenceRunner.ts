import { AllEasing } from "../../libs/easing";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { FunctionContext } from "../graph/execution/createExecutionContext";
import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockParallel, AnimationSequenceBlockSequence, AnimationSequenceBlockSet } from "./AnimationSequenceData";

type AnimationSequenceRunnerT = {
    [TDefinition in AnimationSequenceBlock as TDefinition["type"]]: (model: TDefinition, properties: Record<string, any>) => Generator<void, void, [FunctionContext, number]>;
};

export const AnimationSequenceRunner: AnimationSequenceRunnerT = {
    Delay: function* (model: AnimationSequenceBlockDelay, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {
        let timer = 0;
        while (timer < model.duration) {
            const [inputs, dt] = yield
            timer += dt;
        }
    },
    Lerp: function* (model: AnimationSequenceBlockLerp, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {
        if (!model.target.id || !(model.target.id in properties)) {
            throw new Error(`target "${model.target.id}" is undefined`);
        }
        let interpolator = PortTypeDefinitions[model.target.type]?.lerpOperator;
        if (interpolator === undefined) {
            throw new Error(`${model.target.type} of property ${model.target.id} is not lerpable.`);
        }
        let timer = 0;

        var startValue = properties[model.target.id];
        while (timer < model.duration) {
            const [inputs, dt] = yield

            const t = timer / model.duration;
            const tt = AllEasing[model.easing](t);
            properties[model.target.id] = interpolator(startValue, model.value, tt);


            timer += dt;
        }
        properties[model.target.id] = model.value
    },
    Loop: function* (model: AnimationSequenceBlockLoop, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {
        if (model.child === null) {

            throw new Error(`No animation to execute inside the loop animation`);
        }
        for (let i = 0; i < model.count; i++) {
            yield* createRunnerForBlock(model.child, properties);
        }
    },
    Parallel: function* (model: AnimationSequenceBlockParallel, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {
        const children = model.children.map(child => createRunnerForBlock(child, properties));
        let isDone = true;
        do {
            isDone = true;
            const parameters = yield
            for (let index = 0; index < children.length; index++) {
                const result = children[index].next(parameters);
                isDone = isDone && !!result.done
            }
        }
        while (!isDone)


    },
    Sequence: function* (model: AnimationSequenceBlockSequence, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {

        for (let i = 0; i < model.children.length; i++) {
            yield* createRunnerForBlock(model.children[i], properties);
        }
        console.log("aaa");
        return;
    },
    Set: function* (model: AnimationSequenceBlockSet, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {
        if (!model.target.id || !(model.target.id in properties)) {
            throw new Error(`${model.target.id} is undefined`);
        }
        properties[model.target.id] = model.value;
    }
}

export function createRunnerForBlock(model: AnimationSequenceBlock, properties: Record<string, any>): Generator<void, void, [FunctionContext, number]> {
    return AnimationSequenceRunner[model.type](model as any, properties)
}