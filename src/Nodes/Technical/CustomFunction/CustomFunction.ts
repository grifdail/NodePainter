import { IconArrowsMove } from "@tabler/icons-react";
import { getCustomFunctionEndId } from "../../../Hooks/createFunction";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const CustomFunction: NodeDefinition = {
  id: "Technical/CustomFunction/Base",
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  hideInLibrary: true,
  dataInputs: [],
  dataOutputs: [],
  preventSnippet: true,
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
