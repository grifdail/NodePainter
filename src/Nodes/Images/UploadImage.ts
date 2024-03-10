import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { ImageData } from "../../Data/ImageData";

export const UploadImage: NodeDefinition = {
  id: "UploadImage",
  label: "Upload Image",
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
};
