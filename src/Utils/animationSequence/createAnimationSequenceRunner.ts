import { NodeData } from "../../Types/NodeData";
import { FunctionContext } from "../graph/execution/createExecutionContext";
import { AnimationSequenceData } from "./AnimationSequenceData";
import { createRunnerForBlock } from "./AnimationSequenceRunner";

export const createAnimationSequenceRunner = (model: AnimationSequenceData, inputs: FunctionContext, node: NodeData) => {

    const properties = model.properties.reduce((old, port) => ({ ...old, [port.id]: structuredClone(inputs[port.id]) || { value: structuredClone(port.defaultValue), type: port.type } }), {} as FunctionContext)

    const loop = !!node.settings.loop
    let root = createRunnerForBlock(model.root, properties);
    let isDone = false;

    return function (inputs: FunctionContext, deltaTime: number) {
        if (!isDone) {
            var result = root.next([inputs, deltaTime]);
            if (result.done) {
                console.log("animation done")
                isDone = true
                if (loop) {
                    root = createRunnerForBlock(model.root, properties);
                    isDone = false;
                }
            }
        }
        return properties;

    }

};
