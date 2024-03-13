import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition, PortTypeArray, createDefaultValue } from "../../Data/NodeDefinition";
import { NodeData, PortConnection } from "../../Hooks/useTree";
import { createPortConnection } from "../../Data/createPortConnection";

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

export const Precompute: NodeDefinition = {
  id: "Precompute",
  description: "Precompute the input before executing the rest of the instruction. The random wont change and may help performance",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  getData: (portId, data, context) => {
    const target = context.blackboard[`${data.id}-context`];
    return target[`${portId}-in`];
  },
  execute: (data, context) => {
    var fn: (args: [key: string, port: PortConnection]) => [string, any] = ([key, value]) => [key, context.getInputValue(data, key, value.type)];
    const target = Object.fromEntries(Object.entries(data.dataInputs).map(fn));
    context.blackboard[`${data.id}-context`] = target;
    context.execute(data.execOutputs["execute"] as string);
  },
  contextMenu: {
    ...contextMenuCreateAllNode,
    "Remove last port": (node) => {
      var entries = Object.entries(node.dataOutputs);
      if (entries.length > 0) {
        var [key] = entries[entries.length - 1];
        delete node.dataOutputs[key];
        delete node.dataInputs[`${key}-in`];
      }
    },
  },
};
