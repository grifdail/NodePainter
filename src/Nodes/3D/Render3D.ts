import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { ImageData } from "../../Types/ImageData";

export const Render3D: NodeDefinition = {
  id: "Render3D",
  label: "Render in 3D",
  icon: IconPhoto,
  description: "Render the 'draw' port in 3dimension image you can use in the 'execute' port.",
  canBeExecuted: true,
  dataInputs: [],
  dataOutputs: [
    {
      id: "image",
      type: "image",
      defaultValue: null,
    },
  ],
  tags: ["3D"],
  executeOutputs: ["draw", "execute"],
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
      img.set(context.p5.createGraphics(width, height, context.p5.WEBGL));
      context.blackboard[keyCache] = img;
    }
    let needRedraw = false;
    needRedraw ||= when === "Once" && !context.blackboard[keyComputed];
    needRedraw ||= when === "Per frame" && !context.frameBlackboard[keyComputed];
    needRedraw ||= when === "Everytime";
    if (needRedraw) {
      var oldTarget = context.target;
      context.target = img.image;
      if (node.execOutputs["draw"]) {
        context.execute(node.execOutputs["draw"] as string);
      }

      context.target = oldTarget;
      context.blackboard[keyComputed] = true;
      context.frameBlackboard[keyComputed] = true;
    }
    if (node.execOutputs["execute"]) {
      context.execute(node.execOutputs["execute"] as string);
    }
  },
};
