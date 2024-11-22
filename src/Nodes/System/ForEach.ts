import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes, PortType } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const ForEachNode: NodeDefinition = {
  id: "ForEach",
  description: "Execute an instruction for each element of an array",
  featureLevel: 10,
  icon: IconAssembly,
  tags: ["Control", "Array"],
  dataInputs: [{ id: "array", type: "array-number", defaultValue: [] }],
  dataOutputs: [
    { id: "value", type: "number", defaultValue: 0 },
    { id: "index", type: "number", defaultValue: 10 },
  ],
  executeOutputs: ["loop"],
  settings: [],
  canBeExecuted: true,
  availableTypes: CommonTypes,
  defaultType: "number",
  onChangeType: changeTypeGenerator([], ["value"], ["array"]),
  getData: (portId, nodeData, context) => {
    if (portId === "value") {
      return context.blackboard[`${nodeData.id}-value`] || 0;
    } else {
      return context.blackboard[`${nodeData.id}-index`] || 0;
    }
  },
  execute: (data, context) => {
    var array = context.getInputValue(data, "array", `array-${data.selectedType}` as PortType) as any[];

    for (var i = 0; i < array.length; i++) {
      context.blackboard[`${data.id}-index`] = i;
      context.blackboard[`${data.id}-value`] = array[i];
      if (data.execOutputs.loop) {
        context.execute(data.execOutputs.loop);
      }
    }
  },
};
