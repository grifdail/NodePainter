import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { Image } from "p5";
import { toP5Color } from "../../Utils/colorUtils";

export const DrawImageWithTint: NodeDefinition = {
  id: "DrawImageWithTint",
  label: "Draw tinted image",
  icon: IconPhoto,
  description: "Draw an image",
  canBeExecuted: true,
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "pos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "dim", type: "vector2", defaultValue: createVector2(100, 100) },
    { id: "color", type: "color", defaultValue: createColor() },
  ],
  dataOutputs: [],
  tags: ["Image"],
  executeOutputs: [],
  settings: [],
  execute(node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector(node, "pos");
    var dim = context.getInputValueVector(node, "dim");
    var color = context.getInputValueColor(node, "color");
    if (image && image.isLoaded) {
      context.target.tint(toP5Color(color, context.p5));
      context.target.image(image.image as Image, pos[0], pos[1], dim[0], dim[1]);
      context.target.tint(255, 255);
    }
  },
};
