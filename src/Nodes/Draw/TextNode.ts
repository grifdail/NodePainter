import { IconCursorText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const TextNode: NodeDefinition = {
  id: "Draw/Text",
  label: "Draw Text",
  description: "Draw a line of text",
  icon: IconCursorText,
  tags: ["Drawing", "Text"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "text",
      type: "string",
      defaultValue: "Hello !",
    },
    {
      id: "position",
      type: "vector2",
      defaultValue: createVector2(200, 200),
    },
    {
      id: "size",
      type: "number",
      defaultValue: 25,
    },
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [
    { id: "HorizontalAlign", type: "dropdown", defaultValue: "LEFT", options: ["LEFT", "RIGHT", "CENTER"] },
    { id: "VerticalAlign", type: "dropdown", defaultValue: "BASELINE", options: ["TOP", "CENTER", "BASELINE", "BOTTOM"] },
    { id: "Font", type: "dropdown", defaultValue: "Josefin Sans", options: ["Agbalumo", "Amatic SC", "Concert One", "Josefin Sans", "Lobster", "Merriweather", "Monomaniac One", "Oleo Script", "Open Sans", "Orbitron", "Permanent Marker", "Pixelify Sans", "Titan One"] },
  ],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var text = context.getInputValueString(node, "text");
    var pos = context.getInputValueVector(node, "position");
    var size = context.getInputValueNumber(node, "size");
    return () => {
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.textFont(node.settings.Font);
      context.target.textAlign((context.p5 as any)[node.settings.HorizontalAlign], (context.p5 as any)[node.settings.VerticalAlign]);
      context.target.textSize(size);
      context.target.text(text, pos[0], pos[1]);
    };
  },
};
