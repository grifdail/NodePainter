import { IconAssembly } from "@tabler/icons-react";
import { AllTypes, NodeDefinition, PortTypeArray, createDefaultValue } from "../../Data/NodeDefinition";
import { NodeData, PortConnection } from "../../Hooks/useTree";
import { createPortConnection } from "../../Data/createPortConnection";
import { number } from "mathjs";
import { createColor } from "../../Data/vectorDataType";
import { VectorTypesFull } from "../../Data/NodeDefinition";
import { convertTypeValue } from "../../Data/convertTypeValue";

export const contextMenuCreateAllNode = Object.fromEntries(
  PortTypeArray.map((type) => [
    `Add a ${type} port`,
    (node: NodeData) => {
      var count = Object.entries(node.dataInputs).length;
      node.dataInputs[`type-${count}-in`] = createPortConnection({
        id: `type-${count}-in`,
        type: type,
        defaultValue: createDefaultValue(type),
      });
      node.dataOutputs[`type-${count}`] = {
        id: `type-${count}`,
        type: type,
        defaultValue: createDefaultValue(type),
      };
    },
  ])
);

export const Select: NodeDefinition = {
  id: "Select",
  description: "Select one of the option based on the index",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [
    {
      id: "index",
      type: "number",
      defaultValue: 0,
    },
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
  availableTypes: AllTypes,
  onChangeType(node, type) {
    Object.keys(node.dataInputs)
      .filter((data) => data !== "index")
      .forEach((key) => {
        node.dataInputs[key].ownValue = convertTypeValue(node.dataInputs[key].ownValue, node.dataInputs[key].type, type);
        node.dataInputs[key].type = type;
      });
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, node, context) => {
    var entries = Object.keys(node.dataInputs).filter((data) => data !== "index");
    const index = context.getInputValueNumber(node, "index");
    return context.getInputValue(node, entries[index % entries.length], node.selectedType);
  },
  contextMenu: {
    "`Add a port": (node: NodeData) => {
      var count = Object.entries(node.dataInputs).filter((data) => data[0] !== "index").length;
      node.dataInputs[`value-${count}`] = createPortConnection({
        id: `type-${count}-in`,
        type: node.selectedType,
        defaultValue: createDefaultValue(node.selectedType),
      });
    },
    "Remove last port": (node) => {
      var entries = Object.entries(node.dataInputs).filter((data) => data[0] !== "index");
      if (entries.length > 1) {
        var [key] = entries[entries.length - 1];
        delete node.dataInputs[key];
      }
    },
  },
};
