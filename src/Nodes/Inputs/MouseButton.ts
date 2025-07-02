import { IconMouse } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const MouseButton: NodeDefinition = {
  id: "Input/MouseButton",
  label: "Mouse Button",
  description: "Whether one of the mouse button is pressed",
  icon: IconMouse,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [Port.bool("out")],
  settings: [
    {
      id: "button",
      type: "dropdown",
      defaultValue: "Any",
      options: ["Any", "Left", "Middle", "right"],
    },
  ],
  getData: (portId, nodeData, context) => {
    var button = nodeData.settings.button as string;
    if (!context.p5.mouseIsPressed) {
      return false;
    }
    if (button === "Any") {
      return true;
    }
    if (button === "Left" && context.p5.mouseButton === context.p5.LEFT) {
      return true;
    }
    if (button === "Middle" && context.p5.mouseButton === context.p5.CENTER) {
      return true;
    }
    if (button === "Right" && context.p5.mouseButton === context.p5.RIGHT) {
      return true;
    }
    return false;
  },
};
