import { IconAssembly, IconPlus } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ThenNode: NodeDefinition = {
  id: "Then",
  description: "Execute multiple instruction",
  icon: IconAssembly,
  featureLevel: 50,
  tags: ["Control"],
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: ["0"],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      defaultValue: undefined,
      buttons: [
        {
          label: "Add a new Port",
          icon: IconPlus,
          onClick: (node: NodeData) => {
            var count = Object.entries(node.execOutputs).length;
            node.execOutputs[count] = null;
          },
        },
      ],
    },
  ],
  canBeExecuted: true,
  execute: (data, context) => {
    var count = Object.entries(data.execOutputs).length;
    for (var i = 0; i <= count; i++) {
      if (data.execOutputs[i]) {
        context.execute(data.execOutputs[i.toString()] as string);
      }
    }
  },
  contextMenu: {
    "Add port": (node) => {
      var count = Object.entries(node.execOutputs).length;
      node.execOutputs[count] = null;
    },
    "Remove last port": (node) => {
      var count = Object.entries(node.execOutputs).length;
      delete node.execOutputs[count - 1];
    },
  },
};
