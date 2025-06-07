import { IconArrowsMove } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortDefinition } from "../../Types/PortDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { ExecutionContext } from "../../Utils/createExecutionContext";
import { getCacheKey, updateAndReadFromCache } from "../../Utils/useCache";
export const CUSTOM_SIMULATION = "CustomSimulation";

export const CustomSimulation: NodeDefinition = {
  id: CUSTOM_SIMULATION,
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  hideInLibrary: true,
  preventSnippet: true,
  dataInputs: [Port.CacheId(), Port.bool("reset")],
  dataOutputs: [],
  settings: [{ id: "cache", label: "cache per frame", type: "bool", defaultValue: true }],
  getData: (portId, node, context) => {
    const cacheId = Math.floor(context.getInputValueNumber(node, "cache-id"));
    const reset = context.getInputValueBoolean(node, "reset");
    const key = `${node.id}-${cacheId}-cache`;

    const isComputedThisTime = context.frameBlackboard[key];
    if (isComputedThisTime && node.settings.cache) {
      return context.blackboard[getCacheKey(key, context, node)][portId];
    }

    var state = updateAndReadFromCache<{ [k: string]: any }>(context, node, (oldState) => execute(node, context, oldState, reset), key);
    context.frameBlackboard[key] = true;
    return state[portId];
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

function execute(data: NodeData, context: ExecutionContext, previousState: { [k: string]: any } | undefined, reset: boolean): { [key: string]: any } {
  const stateDefinition = context.getNodeDefinition(`${data.type}-end`)?.dataInputs;

  if (stateDefinition == null) {
    return {};
  }
  if (previousState === undefined || reset) {
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
