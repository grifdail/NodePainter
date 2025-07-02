import { IconPackageImport } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const DecomposeStruct: NodeDefinition = {
  id: "Technical/Struct/Decompose",
  description: "",
  IsUnique: false,
  hideInLibrary: true,
  icon: IconPackageImport,
  tags: [],
  dataInputs: [],
  dataOutputs: [],
  settings: [],
  preventSnippet: true,
  getData: (portId, nodeData, context) => {
    var input = context.getInputValue(nodeData, "struct", "struct") as any;
    var port = nodeData.dataOutputs[portId];
    if (input[portId]) {
      return input[portId];
    } else {
      console.warn(`Type ${portId} is missing in the passed struct of node ${nodeData.id}`);
      return port.defaultValue;
    }
  },
};
