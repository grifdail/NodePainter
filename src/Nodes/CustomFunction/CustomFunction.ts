import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
export const CUSTOM_FUNCTION = "CustomFunction";

export const CustomFunction: NodeDefinition = {
  id: CUSTOM_FUNCTION,
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  hideInLibrary: true,
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const source = context.findNodeOfType(`${nodeData.type}-end`);
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(nodeData, context));

    var result = context.getNodeOutput(source.id, portId);
    context.functionStack.pop();
    return result;
  },
  execute: (data, context) => {
    const source = context.findNodeOfType(`${data.type}-start`);
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(data, context));
    context.execute(source.id);
    context.functionStack.pop();
  },
};
