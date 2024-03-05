import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { ImageData } from "../Data/ImageCache";
import { createVector } from "./Vector";
import { Image } from "p5";
import { createColor, toP5Color } from "./Color";

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
    execute(node, context) {
      var image = context.getInputValue(node, "image") as null | ImageData;
      var pos = context.getInputValue(node, "pos");
      var dim = context.getInputValue(node, "dim");
      if (image && image.isLoaded) {
        context.target.image(image.image as Image, pos.x, pos.y, dim.x, dim.y);
      }
    },
  },
  {
    id: "DrawImageWithTint",
    icon: IconPhoto,
    description: "Draw an image",
    canBeExecuted: true,
    dataInputs: [
      { id: "image", type: "image", defaultValue: null },
      { id: "pos", type: "vector2", defaultValue: createVector(0, 0) },
      { id: "dim", type: "vector2", defaultValue: createVector(100, 100) },
      { id: "color", type: "color", defaultValue: createColor() },
    ],
    dataOutputs: [],
    tags: ["Image"],
    executeOutputs: [],
    settings: [],
    execute(node, context) {
      var image = context.getInputValue(node, "image") as null | ImageData;
      var pos = context.getInputValue(node, "pos");
      var dim = context.getInputValue(node, "dim");
      var color = context.getInputValue(node, "color");
      if (image && image.isLoaded) {
        context.target.tint(toP5Color(color, context.p5));
        context.target.image(image.image as Image, pos.x, pos.y, dim.x, dim.y);
        context.target.tint(255, 255);
      }
    },
  },
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
  },
  {
    id: "PrecomputeImage",
    icon: IconPhoto,
    description: "Render the 'image' port first to an image you can use in the 'execute' port.",
    canBeExecuted: true,
    dataInputs: [],
    dataOutputs: [
      {
        id: "image",
        type: "image",
        defaultValue: null,
      },
    ],
    tags: ["Image"],
    executeOutputs: ["image", "execute"],
    settings: [
      { id: "width", type: "number", defaultValue: 400 },
      { id: "height", type: "number", defaultValue: 400 },
      { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
    ],
    getData(portId, node, context) {
      var keyComputed = `${node.id}-image-cache`;
      return context.blackboard[keyComputed];
    },
    execute(node, context) {
      const width = node.settings.width;
      const height = node.settings.height;
      const when = node.settings.when;
      const keyCache = `${node.id}-image-cache`;
      const keyComputed = `${node.id}-is-computed`;
      let img = context.blackboard[keyCache];
      if (!img) {
        img = new ImageData();
        img.set(context.p5.createGraphics(width, height));
        context.blackboard[keyCache] = img;
      }
      let needRedraw = false;
      needRedraw ||= when === "Once" && !context.blackboard[keyComputed];
      needRedraw ||= when === "Per frame" && !context.frameBlackboard[keyComputed];
      needRedraw ||= when === "Everytime";
      if (needRedraw) {
        var oldTarget = context.target;
        context.target = img.image;
        if (node.execOutputs["image"]) {
          context.execute(node.execOutputs["image"] as string);
        }

        context.target = oldTarget;
        context.blackboard[keyComputed] = true;
        context.frameBlackboard[keyComputed] = true;
      }
      if (node.execOutputs["execute"]) {
        context.execute(node.execOutputs["execute"] as string);
      }
    },
  },
];
