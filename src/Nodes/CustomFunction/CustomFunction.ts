import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { getCustomFunctionEndId, getCustomFunctionStartId } from "../../Hooks/createFunction";
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
    const source = context.findNodeOfType(getCustomFunctionEndId(nodeData.type));
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(nodeData, context));

    var result = context.getInputValue(source, portId, nodeData.dataOutputs[portId].type);
    context.functionStack.pop();
    return result;
  },
  execute: (data, context) => {
    const source = context.findNodeOfType(getCustomFunctionStartId(data.type));
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(data, context));
    context.execute(source.id);
    context.functionStack.pop();
  },
};
