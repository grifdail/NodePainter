import { IconArrowsMove } from "@tabler/icons-react";
import Rand from "rand-seed";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortDefinition } from "../../Types/PortDefinition";
import { ExecutionContext } from "../../Utils/createExecutionContext";
export const CUSTOM_SIMULATION = "CustomSimulation";

export const CustomSimulation: NodeDefinition = {
  id: CUSTOM_SIMULATION,
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  hideInLibrary: true,
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  getData: (portId, data, context) => {
    const useCount = context.frameBlackboard[`${data.id}-use`];
    const stateId = `${data.id}-${useCount}-state`;
    let state: { [k: string]: any } = {};
    if (context.blackboard[stateId] === undefined) {
      state = createDefaultState(data, context, context.getNodeDefinition(`${data.type}-end`)?.dataInputs);
    } else {
      state = context.blackboard[stateId];
    }

    return state[portId];
  },
  execute: (data, context) => {
    context.frameBlackboard[`${data.id}-use`] = context.frameBlackboard[`${data.id}-use`] !== undefined ? context.frameBlackboard[`${data.id}-use`] + 1 : 0;
    var useCount = context.frameBlackboard[`${data.id}-use`];
    const stateId = `${data.id}-${useCount}-state`;
    var progress = context.getInputValueNumber(data, "progress");
    let state: { [k: string]: any } = {};
    const stateDefinition = context.getNodeDefinition(`${data.type}-end`)?.dataInputs;

    if (stateDefinition == null) {
      return null;
    }
    if (context.blackboard[stateId] === undefined || progress < context.blackboard[`${data.id}-${useCount}-progress`]) {
      state = createDefaultState(data, context, stateDefinition);
    } else {
      state = context.blackboard[stateId];
    }

    const endNode = context.findNodeOfType(`${data.type}-end`);
    if (!endNode) {
      return null;
    }

    const startNode = context.findNodeOfType(`${data.type}-start`);
    if (!startNode) {
      return null;
    }

    const params = Object.fromEntries(
      Object.entries(startNode.dataOutputs).map(([key, def]) => {
        return [key, { type: def.type, value: state[key] === undefined ? context.getInputValue(data, key, def.type) : state[key] }];
      })
    );
    context.functionStack.push(params);
    var oldGen = context.RNG;

    context.RNG = new Rand(Date.now().toString());
    state = Object.fromEntries(
      stateDefinition.map((item) => {
        return [item.id, context.getInputValue(endNode, item.id, item.type)];
      })
    );
    context.RNG = oldGen;
    context.blackboard[stateId] = state;
    context.blackboard[`${data.id}-${useCount}-progress`] = progress;
    context.functionStack.pop();
    var execute = data.execOutputs["execute"];
    if (execute != null) {
      context.execute(execute);
    }
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
