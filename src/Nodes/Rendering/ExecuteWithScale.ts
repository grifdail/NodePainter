import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2, createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";

export const ExecuteWithScale: NodeDefinition = {
  id: "WithScale",
  label: "Render with scale",
  description: "Execute the next instruction as if the canvas was scaled",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "scale", type: "vector2", defaultValue: createVector2() }, Port.drawing2d("drawing")],
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
