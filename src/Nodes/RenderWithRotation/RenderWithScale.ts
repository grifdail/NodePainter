import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";

export const RenderWithScale: NodeDefinition = {
  id: "RenderWithScale",
  label: "Render with scale",
  description: "Execute the next instruction as if the canvas was scaled",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [Port.vector2("scale", createVector2(1, 1)), Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  defaultType: "vector2",
  availableTypes: ["vector2", "vector3"],
  onChangeType: changeTypeGenerator(["scale"], []),
  hasInput: hasInputGenerator(["vector2", "vector3"]),
  hasOutput: hasInputGenerator(["vector2", "vector3"]),
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
