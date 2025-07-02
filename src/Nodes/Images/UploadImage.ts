import { IconCameraUp } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const UploadImage: NodeDefinition = {
  id: "Image/UploadImage",
  label: "Upload Image",
  icon: IconCameraUp,
  description: "Upload an image",
  dataInputs: [],
  dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
  tags: ["Image"],

  settings: [{ id: "image", type: "image-upload" }],
  getData(portId, data, context) {
    if (data.settings.image != null) {
      var key = `${data.id}-image-cache`;
      if (!context.blackboard[key]) {
        const img = new ImageData({ url: data.settings.image });
        context.blackboard[key] = img;
        return img;
      } else {
        return context.blackboard[key];
      }
    }

    return;
  },
};
