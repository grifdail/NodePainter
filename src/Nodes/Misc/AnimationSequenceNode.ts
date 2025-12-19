import { IconKeyframes } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { AnimationSequenceData } from "../../Utils/animationSequence/AnimationSequenceData";
import { createAnimationSequenceRunner } from "../../Utils/animationSequence/createAnimationSequenceRunner";
import { createDefaultAnimationSequence } from "../../Utils/animationSequence/createDefaultAnimationSequence";
import { cacheBehaviorSetting } from "../../Utils/graph/definition/cacheBehaviorSetting";
import { readFromCache, useFrameCache } from "../../Utils/graph/execution/blackboardCache";

export const AnimationSequenceNode: NodeDefinition = {
    id: "Misc/AnimationSequence",
    description: "Define an series of animation that define some properties",
    icon: IconKeyframes,
    tags: ["Misc"],
    preventSnippet: false,
    hideInLibrary: false,
    dataInputs: [Port.CacheId(), Port.Reset()],
    dataOutputs: [],
    settings: [
        {
            id: "animation",
            type: "animation-sequence",
            defaultValue: createDefaultAnimationSequence(),
            onChange(node, newValue, oldValue, definitions) {
                const data = newValue as AnimationSequenceData;
                var tree = useTree.getState();
                tree.replaceInputs((t) => t.id === node.id, [...AnimationSequenceNode.dataInputs, ...data.inputVariables, ...data.properties]);
                tree.replaceOutput((t) => t.id === node.id, data.properties);
            },
        },
        { id: "loop", type: "bool", tooltip: "Should the animation play again once it's finished ?", defaultValue: true },
        cacheBehaviorSetting()
    ],
    getData: (portId, node, context) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = useFrameCache(context, node, () => {

            var inputs = context.createFunctionContext(node);
            const animationSequenceRunner = readFromCache(context, node, () => {
                return createAnimationSequenceRunner(node.settings.animation as AnimationSequenceData, inputs, node);
            });

            return animationSequenceRunner(inputs, context.deltaTime);
        })


        if (!result[portId]) {
            throw new Error(`There's no property named "${portId}" in the animation sequence.`);
        }
        return result[portId].value;
    },
};

