import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const PrecomputeImage: NodeDefinition = {
  id: "PrecomputeImage",
  label: "Precompute image",
  icon: IconPhoto,
  description: "Render the 'image' port first to an image you can use in the 'execute' port.",

  dataInputs: [],
  dataOutputs: [
    {
      id: "image",
      type: "image",
      defaultValue: null,
    },
    Port.drawing2d("drawing"),
  ],
  tags: ["Image"],
  settings: [
    { id: "width", type: "number", defaultValue: 400 },
    { id: "height", type: "number", defaultValue: 400 },
    { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
  ],
  getData(portId, node, context) {
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
      const drawing = context.getInputValueDrawing(node, "drawing");
      drawing();

      context.target = oldTarget;
      context.blackboard[keyComputed] = true;
      context.frameBlackboard[keyComputed] = true;
    }

    return img;
  },
};
