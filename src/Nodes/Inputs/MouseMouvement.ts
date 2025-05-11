import { IconMouse } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const MouseMouvement: NodeDefinition = {
  id: "MouseMovement",
  label: "Mouse Movement",
  description: "The movement of the cursor since the last frame",
  icon: IconMouse,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "pos", type: "vector2", defaultValue: createVector2() }],

  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector2(context.p5.pmouseX - context.p5.mouseX, context.p5.pmouseY - context.p5.mouseY);
  },
};
