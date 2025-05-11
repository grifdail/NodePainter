import { IconRotate } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";

export const ExecuteWithRotation: NodeDefinition = {
  id: "WithRotation",
  label: "Render with rotation",
  description: "Execute the next instruction as if the canvas was rotated",
  featureLevel: 4,
  icon: IconRotate,
  tags: ["Transform"],
  dataInputs: [{ id: "angle", type: "number", defaultValue: 0 }, Port.drawing2d("drawing")],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  defaultType: "number",
  availableTypes: ["number"],
  onChangeType: changeTypeGenerator(["angle"], []),
  hasInput: hasInputGenerator(["number", "vector3"]),
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
