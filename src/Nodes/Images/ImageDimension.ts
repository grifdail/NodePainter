import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const ImageDimension: NodeDefinition = {
  id: "ImageDimension",
  label: "Image dimension",
  icon: IconPhoto,
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
    if (image && image.isLoaded) {
      console.log(image);
      return createVector2(image.image?.width, image.image?.height);
    } else {
      return createVector2();
    }
  },
};
