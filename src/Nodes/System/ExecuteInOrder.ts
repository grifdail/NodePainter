import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ExecuteInOrder: NodeDefinition = {
  id: "ExecuteInOrder",
  label: "Execute in order",
  description: "Execute the instruction in the order of their input",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [
    { id: "a", type: "number", defaultValue: 10 },
    { id: "A", type: "drawing2d", defaultValue: null },
    { id: "b", type: "number", defaultValue: 10 },
    { id: "B", type: "drawing2d", defaultValue: null },
  ],
  settings: [],
  dataOutputs: [{ id: "out", type: "drawing2d", defaultValue: null }],
  getData(portId, data, context) {
    var a = context.getInputValueNumber(data, "a");
    var b = context.getInputValueNumber(data, "b");
    var A = context.getInputValueDrawing(data, "A");
    var B = context.getInputValueDrawing(data, "B");
    return () => {
      if (a >= b) {
        B();
        A();
      } else {
        A();
        B();
      }
    };
  },
};
