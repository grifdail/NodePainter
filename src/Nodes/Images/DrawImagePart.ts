import { IconGrid3x3, IconPhoto } from "@tabler/icons-react";
import { Image } from "p5";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2 } from "../../Types/vectorDataType";

export const DrawImagePart: NodeDefinition = {
  id: "DrawImagePart",
  label: "Draw Image Part",
  icon: DoubleIconGen(IconPhoto, IconGrid3x3),
  description: "Draw only a portion of an image",
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "pos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "dim", type: "vector2", defaultValue: createVector2(400, 400) },
    { id: "sourcePos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "sourceDim", type: "vector2", defaultValue: createVector2(100, 100) },
  ],
  dataOutputs: [Port.drawing2d("out")],
  tags: ["Image"],

  settings: [],
  getData(portId, node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector(node, "pos");
    var dim = context.getInputValueVector(node, "dim");
    var sourcePos = context.getInputValueVector(node, "sourcePos");
    var sourceDim = context.getInputValueVector(node, "sourceDim");
    return () => {
      if (image && image.getP5(context.p5)) {
        context.target.image(image.getP5(context.p5) as Image, pos[0], pos[1], dim[0], dim[1], sourcePos[0], sourcePos[1], sourceDim[0], sourceDim[1]);
      }
    };
  },
};
