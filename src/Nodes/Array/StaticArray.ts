import { IconList } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes, PortType } from "../../Types/PortType";
import { createColor } from "../../Types/vectorDataType";
import { convertTypeValue } from "../../Utils/convertTypeValue";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { createPortConnection } from "../../Utils/createPortConnection";

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
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  defaultType: "color",
  availableTypes: CommonTypes,
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
    "`Add a port": (node: NodeData) => {
      var count = Object.entries(node.dataInputs).length;
      node.dataInputs[`value-${count}`] = createPortConnection({
        id: `value-${count}`,
        type: node.selectedType,
        defaultValue: createDefaultValue(node.selectedType),
      });
    },
    "Remove last port": (node) => {
      var entries = Object.entries(node.dataInputs);
      if (entries.length > 1) {
        var [key] = entries[entries.length - 1];
        delete node.dataInputs[key];
      }
    },
  },
};
