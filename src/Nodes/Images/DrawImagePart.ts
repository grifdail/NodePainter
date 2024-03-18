import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";
import { Image } from "p5";

export const DrawImagePart: NodeDefinition = {
  id: "DrawImagePart",
  label: "Draw Image Part",
  icon: IconPhoto,
  description: "Draw only a portion of an image",
  canBeExecuted: true,
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "pos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "dim", type: "vector2", defaultValue: createVector2(400, 400) },
    { id: "sourcePos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "sourceDim", type: "vector2", defaultValue: createVector2(100, 100) },
  ],
  dataOutputs: [],
  tags: ["Image"],
  executeOutputs: [],
  settings: [],
  execute(node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector(node, "pos");
    var dim = context.getInputValueVector(node, "dim");
    var sourcePos = context.getInputValueVector(node, "sourcePos");
    var sourceDim = context.getInputValueVector(node, "sourceDim");
    if (image && image.isLoaded) {
      context.target.image(image.image as Image, pos[0], pos[1], dim[0], dim[1], sourcePos[0], sourcePos[1], sourceDim[0], sourceDim[1]);
    }
  },
};
