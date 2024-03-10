import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const ExecuteInOrder: NodeDefinition = {
  id: "ExecuteInOrder",
  label: "Execute in order",
  description: "Execute the instruction in the order of their input",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [
    { id: "a", type: "number", defaultValue: 10 },
    { id: "b", type: "number", defaultValue: 10 },
  ],
  dataOutputs: [],
  executeOutputs: ["A", "B"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var a = context.getInputValueNumber(data, "a");
    var b = context.getInputValueNumber(data, "b");
    if (a >= b) {
      if (data.execOutputs.A) {
        context.execute(data.execOutputs.A);
      }
      if (data.execOutputs.B) {
        context.execute(data.execOutputs.B);
      }
    } else {
      if (data.execOutputs.B) {
        context.execute(data.execOutputs.B);
      }
      if (data.execOutputs.A) {
        context.execute(data.execOutputs.A);
      }
    }
  },
};
