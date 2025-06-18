import { IconPaint, IconPhoto } from "@tabler/icons-react";
import { Image } from "p5";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const DrawImageWithTint: NodeDefinition = {
  id: "DrawImageWithTint",
  label: "Draw tinted image",
  icon: DoubleIconGen(IconPhoto, IconPaint),
  description: "Draw an image",
  dataInputs: [
    { id: "image", type: "image", defaultValue: null },
    { id: "pos", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "dim", type: "vector2", defaultValue: createVector2(100, 100) },
    { id: "color", type: "color", defaultValue: createColor() },
  ],
  dataOutputs: [Port.drawing2d("out")],
  tags: ["Image"],

  settings: [],
  getData(portId, node, context) {
    var image = context.getInputValueImage(node, "image");
    var pos = context.getInputValueVector(node, "pos");
    var dim = context.getInputValueVector(node, "dim");
    var color = context.getInputValueColor(node, "color");
    return () => {
      if (image && image.getP5(context.p5)) {
        context.target.tint(toP5Color(color, context.p5));
        context.target.image(image.getP5(context.p5) as Image, pos[0], pos[1], dim[0], dim[1]);
        context.target.tint(255, 255);
      }
    };
  },
};
