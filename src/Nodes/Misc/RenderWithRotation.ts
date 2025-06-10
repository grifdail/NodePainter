import { IconRotate } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const RenderWithRotation: NodeDefinition = {
  id: "RenderWithRotation",
  label: "Apply rotation",
  alias: "Rotate",
  description: "Execute the next instruction as if the canvas was rotated",
  featureLevel: 4,
  icon: IconRotate,
  tags: ["Misc"],
  dataInputs: [Port.number("angle"), Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],

  getData(portId, data, context) {
    const angle = context.getInputValueNumber(data, "angle");
    const drawing = context.getInputValueDrawing(data, "drawing");

    return () => {
      context.target.push();
      context.target.rotate(angle);
      drawing();
      context.target.pop();
    };
  },
};
