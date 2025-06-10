import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector3 } from "../../Types/vectorDataType";

export const RenderWithTranslation: NodeDefinition = {
  id: "RenderWithTranslation",
  label: "Apply translation",

  featureLevel: 4,
  description: "Execute the next instruction as if the canvas was moved",
  icon: IconArrowsMove,
  tags: ["Misc"],
  dataInputs: [Port.vector2("translation"), Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, node, context) {
    const translation = context.getInputValueVector(node, "translation") as Vector3;
    const drawing = context.getInputValueDrawing(node, "drawing");
    return () => {
      context.target.push();
      context.target.translate(...translation);
      drawing();
      context.target.pop();
    };
  },
};
