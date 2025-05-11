import { IconPhoto } from "@tabler/icons-react";
import { Image } from "p5";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2 } from "../../Types/vectorDataType";

console.log(Port);

export const DrawImage: NodeDefinition = {
  id: "DrawImage",
  label: "Draw Image",
  icon: IconPhoto,
  description: "Draw an image",
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "pos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "dim", type: "vector2", defaultValue: createVector2(400, 400) },
  ],
  dataOutputs: [Port.drawing2d("out")],
  tags: ["Image"],

  settings: [],
  getData(portId, node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector(node, "pos");
    var dim = context.getInputValueVector(node, "dim");
    return () => {
      if (image && image.isLoaded) {
        context.target.image(image.image as Image, pos[0], pos[1], dim[0], dim[1]);
      }
    };
  },
};
