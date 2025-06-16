import { IconPhoto, IconRuler } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const ImageDimension: NodeDefinition = {
  id: "ImageDimension",
  label: "Image dimension",
  icon: DoubleIconGen(IconPhoto, IconRuler),
  description: "Return the dimension of an image",

  dataInputs: [{ id: "image", type: "image", defaultValue: null }],
  dataOutputs: [
    {
      id: "dim",
      type: "vector2",
      defaultValue: createVector2(100, 100),
    },
  ],
  tags: ["Image"],

  settings: [],
  getData(portId, node, context) {
    var image = context.getInputValueImage(node, "image");
    if (!image) {
      return createVector2();
    }
    if (image.p5Graphics) {
      return createVector2(image.p5Graphics.width, image.p5Graphics.height);
    }
    if (image.p5Images) {
      return createVector2(image.p5Images.width, image.p5Images.height);
    }
    if (image.canvas) {
      return createVector2(image.canvas.width, image.canvas.height);
    }
    if (image.threeTexture) {
      return createVector2(image.threeTexture.image.width, image.threeTexture.image.height);
    }
  },
};
