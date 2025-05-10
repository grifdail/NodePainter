import { IconCursorText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawText: NodeDefinition = {
  id: "DrawText",
  label: "Draw Text",
  description: "Draw a line of text",
  icon: IconCursorText,
  tags: ["Draw", "Text"],
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
  dataOutputs: [],
  executeOutputs: [],
  settings: [
    { id: "HorizontalAlign", type: "dropdown", defaultValue: "LEFT", options: ["LEFT", "RIGHT", "CENTER"] },
    { id: "VerticalAlign", type: "dropdown", defaultValue: "BASELINE", options: ["TOP", "CENTER", "BASELINE", "BOTTOM"] },
    { id: "Font", type: "dropdown", defaultValue: "Josefin Sans", options: ["Agbalumo", "Amatic SC", "Concert One", "Josefin Sans", "Lobster", "Merriweather", "Monomaniac One", "Oleo Script", "Open Sans", "Orbitron", "Permanent Marker", "Pixelify Sans", "Titan One"] },
  ],
  canBeExecuted: true,
  execute: (data, context) => {
    var color = context.getInputValueColor(data, "color");
    var text = context.getInputValueString(data, "text");
    var pos = context.getInputValueVector(data, "position");
    var size = context.getInputValueNumber(data, "size");
    context.target.fill(toP5Color(color, context.p5));
    context.target.noStroke();
    context.target.textFont(data.settings.Font);
    context.target.textAlign((context.p5 as any)[data.settings.HorizontalAlign], (context.p5 as any)[data.settings.VerticalAlign]);
    context.target.textSize(size);
    context.target.text(text, pos[0], pos[1]);
  },
};
