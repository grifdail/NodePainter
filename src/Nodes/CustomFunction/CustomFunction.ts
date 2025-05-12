import { IconArrowsMove } from "@tabler/icons-react";
import { getCustomFunctionEndId } from "../../Hooks/createFunction";
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

  settings: [],
  getData: (portId, nodeData, context) => {
    const source = context.findNodeOfType(getCustomFunctionEndId(nodeData.type));
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(nodeData));

    var result = context.getInputValue(source, portId, nodeData.dataOutputs[portId].type);
    context.functionStack.pop();
    return result;
  },
};
