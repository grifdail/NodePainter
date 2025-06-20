import { IconList, IconPlus } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createColor } from "../../Types/vectorDataType";
import { convertTypeValue } from "../../Utils/graph/execution/convertTypeValue";
import { createPortConnection } from "../../Utils/graph/modification/createPortConnection";

const addNewPort = (node: NodeData) => {
  var count = Object.entries(node.dataInputs).length;
  node.dataInputs[`value-${count}`] = createPortConnection({
    id: `value-${count}`,
    type: node.selectedType,
    defaultValue: PortTypeDefinitions[node.selectedType].createDefaultValue(),
  });
};

export const StaticArray: NodeDefinition = {
  id: "StaticArray",
  description: "Create an array from multiple static value",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "value-0",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "value-1",
      type: "color",
      defaultValue: createColor(),
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: createColor(), type: "color" }],

  settings: [
    {
      id: "buttons",
      type: "buttons",
      buttons: [
        {
          label: "Add a new Port",
          icon: IconPlus,
          onClick: addNewPort,
        },
      ],
    },
  ],
  availableTypes: portTypesWithTags(["common"], ["array"]),
  onChangeType(node, type) {
    Object.keys(node.dataInputs).forEach((key) => {
      node.dataInputs[key].ownValue = convertTypeValue(node.dataInputs[key].ownValue, node.dataInputs[key].type, type);
      node.dataInputs[key].type = type;
    });
    node.dataOutputs["out"].type = `array-${type}` as PortType;
  },
  getData: (portId, node, context) => {
    var entries = Object.keys(node.dataInputs);
    return entries.map((key) => context.getInputValue(node, key, node.selectedType));
  },
  contextMenu: {
    "Add a port": addNewPort,
    "Remove last port": (node) => {
      console.log(node);
      var entries = Object.entries(node.dataInputs);
      if (entries.length > 1) {
        var [key] = entries[entries.length - 1];
        delete node.dataInputs[key];
      }
    },
  },
};
