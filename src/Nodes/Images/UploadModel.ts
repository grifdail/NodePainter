import { IconPhoto } from "@tabler/icons-react";
import p5 from "p5";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const UploadModel: NodeDefinition = {
  id: "UploadModel",
  label: "Upload Model",
  icon: IconPhoto,
  description: "Upload a 3d Model",
  dataInputs: [],
  dataOutputs: [{ id: "model", type: "model", defaultValue: null }],
  tags: ["3d"],
  executeOutputs: [],
  settings: [{ id: "model", type: "model-upload", defaultValue: null }],
  getData(portId, data, context) {
    if (data.settings.model != null) {
      var key = `${data.id}-model-cache`;
      if (!context.blackboard[key]) {
        new p5((p5) => {
          const model = p5.createModel(data.settings.model.source, data.settings.model.ext);
          context.blackboard[key] = model;
        });
        return null;
      } else {
        return context.blackboard[key];
      }
    }

    return;
  },
};
