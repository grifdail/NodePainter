import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2 } from "../../Data/vectorDataType";
import { Image } from "p5";

export const ImageDimension: NodeDefinition = {
  id: "ImageDimension",
  label: "Image dimension",
  icon: IconPhoto,
  description: "Return the dimension of an image",
  canBeExecuted: false,
  dataInputs: [{ id: "image", type: "image", defaultValue: null }],
  dataOutputs: [
    {
      id: "dim",
      type: "vector2",
      defaultValue: createVector2(100, 100),
    },
  ],
  tags: ["Image"],
  executeOutputs: [],
  settings: [],
  getData(portId, node, context) {
    var image = context.getInputValueImage(node, "image");
    if (image && image.isLoaded) {
      console.log(image);
      return createVector2(image.image?.width, image.image?.height);
    } else {
      return createVector2();
    }
  },
};
