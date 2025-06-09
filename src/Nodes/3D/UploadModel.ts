import { IconPackageExport } from "@tabler/icons-react";
import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const UploadModel: NodeDefinition = {
  id: "UploadModel",
  label: "Upload Model",
  icon: IconPackageExport,
  description: "Upload a 3d Model",
  dataInputs: [Port.vector3("position"), Port.vector3("dimension", createVector3(1, 1, 1)), Port.quaternion("rotation")],
  dataOutputs: [Port.object3d("out")],
  tags: ["3D"],

  settings: [{ id: "model", type: "mesh-upload" }],
  getData(portId, node, context) {
    if (node.settings.model != null) {
      const key = `${node.id}-model-cache`;
      const keyLoading = `${node.id}-model-loading`;
      if (context.blackboard[key]) {
        const rotation = context.getInputValueQuaternion(node, "rotation");
        const position = context.getInputValueVector3(node, "position");
        const dimension = context.getInputValueVector3(node, "dimension");
        const id = context.getCallId(node);
        return VirtualNodes.UploadedModelVirtualNodeType.generate(id, [], position, rotation, dimension, context.blackboard[key] as Object3D);
      } else if (!context.blackboard[keyLoading]) {
        const loader = new GLTFLoader();
        loader.parse(
          node.settings.model.source,
          "./",
          (gltf) => {
            context.blackboard[key] = gltf.scene;
            context.blackboard[keyLoading] = false;
          },
          (err) => console.log(err)
        );
        context.blackboard[keyLoading] = true;
        return null;
      }
    }

    return;
  },
};
