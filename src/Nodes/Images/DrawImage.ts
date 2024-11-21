import { IconPhoto } from "@tabler/icons-react";
import { Image } from "p5";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const DrawImage: NodeDefinition = {
  id: "DrawImage",
  label: "Draw Image",
  icon: IconPhoto,
  description: "Draw an image",
  canBeExecuted: true,
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "pos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "dim", type: "vector2", defaultValue: createVector2(400, 400) },
  ],
  dataOutputs: [],
  tags: ["Image"],
  executeOutputs: [],
  settings: [],
  execute(node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector(node, "pos");
    var dim = context.getInputValueVector(node, "dim");
    if (image && image.isLoaded) {
      context.target.image(image.image as Image, pos[0], pos[1], dim[0], dim[1]);
    }
  },
};
