import { IconBrush } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const PaintImage: NodeDefinition = {
  id: "PaintImage",
  label: "Paint Image",
  icon: IconBrush,
  description: "Paint an image directly",
  dataInputs: [],
  dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
  tags: ["Image"],

  settings: [{ id: "image", type: "image-paint", defaultValue: null }],
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
};
