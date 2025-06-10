import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../Types/vectorDataType";

export const RenderWithScale: NodeDefinition = {
  id: "RenderWithScale",
  label: "Apply scale",
  description: "Execute the next instruction as if the canvas was scaled",
  icon: IconArrowsMove,
  tags: ["Misc"],
  dataInputs: [Port.vector2("scale", createVector2(1, 1)), Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, data, context) {
    var scale = context.getInputValueVector(data, "scale") as Vector2;
    var drawing = context.getInputValueDrawing(data, "drawing");
    return () => {
      context.target.push();
      context.target.scale(...scale);
      drawing();
      context.target.pop();
    };
  },
};
