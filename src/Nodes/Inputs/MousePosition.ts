import { IconMouse } from "@tabler/icons-react";
import { createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const MousePosition: NodeDefinition = {
  id: "MousePosition",
  label: "Mouse Position",
  description: "The position of the cursor relative to the canvas",
  icon: IconMouse,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "pos", type: "vector2", defaultValue: createVector2() }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector2(context.p5.mouseX, context.p5.mouseY);
  },
};
