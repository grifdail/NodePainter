import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { ImageData } from "../Data/ImageCache";
import { createVector } from "./Vector";
import { Image } from "p5";

export const ImageNode: Array<NodeDefinition> = [
  {
    id: "UploadImage",
    icon: IconPhoto,
    description: "Upload an image",
    dataInputs: [],
    dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
    tags: ["Image"],
    executeOutputs: [],
    settings: [{ id: "image", type: "image-upload", defaultValue: null }],
    getData(portId, data, context) {
      if (data.settings.image != null) {
        var key = `${data.id}-image-cache`;
        if (!context.blackboard[key]) {
          const img = new ImageData();
          img.load(data.settings.image, context.p5);
          context.blackboard[key] = img;
          return img;
        } else {
          return context.blackboard[key];
        }
      }

      return;
    },
    execute: null,
  },
  {
    id: "DrawImage",
    icon: IconPhoto,
    description: "Draw an image",
    canBeExecuted: true,
    dataInputs: [
      { id: "image", type: "image", defaultValue: null },
      { id: "pos", type: "vector2", defaultValue: createVector(0, 0) },
      { id: "dim", type: "vector2", defaultValue: createVector(100, 100) },
    ],
    dataOutputs: [],
    tags: ["Image"],
    executeOutputs: [],
    settings: [],
    getData(portId, data, context) {},
    execute(node, context) {
      var image = context.getInputValue(node, "image") as null | ImageData;
      var pos = context.getInputValue(node, "pos");
      var dim = context.getInputValue(node, "dim");
      if (image && image.isLoaded) {
        context.p5.image(image.image as Image, pos.x, pos.y, dim.x, dim.y);
      }
    },
  },
];
