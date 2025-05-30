import { IconBadge3d } from "@tabler/icons-react";
import { MaterialData } from "../../Types/MaterialData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector3 } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const RenderModel: NodeDefinition = {
  id: "RenderModel",
  label: "Render Model",
  description: "Render a 3D Model based on a mesh and a material",
  icon: IconBadge3d,
  tags: ["3D"],
  dataInputs: [
    {
      id: "mesh",
      type: "mesh",
      defaultValue: null,
    },
    {
      id: "material",
      type: "material",
      defaultValue: createDefaultMaterial(),
    },
    {
      id: "position",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
    {
      id: "dimension",
      type: "vector3",
      defaultValue: createVector3(1, 1, 1),
    },
    {
      id: "rotation",
      type: "quaternion",
      defaultValue: [0, 0, 0, 1],
    },
  ],
  dataOutputs: [
    {
      id: "object",
      type: "object3d",
      defaultValue: null,
    },
  ],

  settings: [],
  getData(portId, node, context) {
    var material = context.getInputValueMaterial(node, "material") as MaterialData;
    var mesh = context.getInputValueMesh(node, "mesh");
    var rotation = context.getInputValueQuaternion(node, "rotation");
    var position = context.getInputValueVector3(node, "position");
    var dimension = context.getInputValueVector3(node, "dimension");
    const id = context.getCallId(node);
    const virtual = VirtualNodes.GenericModelVirtualNodeType.generate(id, [material, mesh], position, rotation, dimension);
    return virtual;
  },
};
