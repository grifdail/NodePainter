import { IconArrowsMove } from "@tabler/icons-react";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { frameCacheSetting } from "../../../Utils/graph/definition/FrameCacheSetting";
import { useCache, useFrameCache } from "../../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../../Utils/graph/execution/createExecutionContext";

export const CustomSimulation: NodeDefinition = {
    id: "Technical/Simulation/Base",
    description: "",
    IsUnique: true,
    icon: IconArrowsMove,
    tags: [],
    hideInLibrary: true,
    preventSnippet: true,
    dataInputs: [Port.CacheId(), Port.bool("reset")],
    dataOutputs: [],
    settings: [{ id: "cache", label: "cache per frame", type: "bool", defaultValue: true }, frameCacheSetting()],
    getData: (portId, node, context) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var result = useFrameCache(context, node, () => {
            let [previous, setValue] = useCache(context, node);
            const newItem = execute(node, context, previous)
            setValue(newItem);
            return newItem;
        })

        return result[portId];
    },
};

function createDefaultState(data: NodeData, context: ExecutionContext, dataInputs: PortDefinition[] | undefined): { [k: string]: any } {
    if (dataInputs === undefined) {
        return {};
    }
    return Object.fromEntries(
        dataInputs.map((value) => {
            return [value.id, context.getInputValue(data, value.id, value.type)];
        })
    );
}

function execute(data: NodeData, context: ExecutionContext, previousState: { [k: string]: any } | undefined): { [key: string]: any } {
    const stateDefinition = context.getNodeDefinition(`${data.type}-end`)?.dataInputs;

    if (stateDefinition == null) {
        return {};
    }
    if (previousState === undefined) {
        previousState = createDefaultState(data, context, stateDefinition);
    }

    const endNode = context.findNodeOfType(`${data.type}-end`);
    if (!endNode) {
        return previousState;
    }

    const startNode = context.findNodeOfType(`${data.type}-start`);
    if (!startNode) {
        return previousState;
    }

    const params = Object.fromEntries(
        Object.entries(startNode.dataOutputs).map(([key, def]) => {
            return [key, { type: def.type, value: previousState === undefined || previousState[key] === undefined ? context.getInputValue(data, key, def.type) : previousState[key] }];
        })
    );
    context.functionStack.push(params);

    const state = Object.fromEntries(
        stateDefinition.map((item) => {
            return [item.id, context.getInputValue(endNode, item.id, item.type)];
        })
    );

    context.functionStack.pop();
    return state;
}
