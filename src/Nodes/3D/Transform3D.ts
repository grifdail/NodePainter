import { IconBadge3d } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const Transform3D: NodeDefinition = {
  id: "Transform3D",
  label: "Transform 3D",
  description: "Transform a 3d model",
  icon: IconBadge3d,
  tags: ["3D"],
  dataInputs: [
    Port.object3d("object"),
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
    var mesh = context.getInputValue(node, "object", "object3d") as any;
    var rotation = context.getInputValueQuaternion(node, "rotation");
    var position = context.getInputValueVector3(node, "position");
    var dimension = context.getInputValueVector3(node, "dimension");
    const id = context.getCallId(node);
    const virtual = VirtualNodes.TransformedObjectModelVirtualNodeType.generate(id, [mesh], position, rotation, dimension);
    return virtual;
  },
};
