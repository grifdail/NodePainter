import { IconPackageImport } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const ComposeStruct: NodeDefinition = {
  id: "Technical/Struct/Compose",
  description: "",
  IsUnique: false,
  hideInLibrary: true,
  icon: IconPackageImport,
  tags: [],
  dataInputs: [],
  dataOutputs: [],
  preventSnippet: true,
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = Object.entries(nodeData.dataInputs).reduce((old, [key, value]) => {
      return { ...old, [key]: context.getInputValue(nodeData, key, value.type) };
    }, {});
    return a;
  },
};
