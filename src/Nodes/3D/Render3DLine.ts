import { IconBadge3d } from "@tabler/icons-react";
import { MaterialData } from "../../Types/MaterialData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const Render3DLine: NodeDefinition = {
  id: "Render3DLine",
  label: "Render 3D Line",
  description: "Render a line in 3D",
  icon: IconBadge3d,
  tags: ["3D"],
  dataInputs: [
    Port.vector3("start"),
    Port.vector3("end"),
    Port.number("size", 0.2),
    {
      id: "material",
      type: "material",
      defaultValue: createDefaultMaterial(),
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
    var start = context.getInputValueVector3(node, "start");
    var end = context.getInputValueVector3(node, "end");
    var size = context.getInputValueNumber(node, "size");
    const id = context.getCallId(node);
    const virtual = VirtualNodes.Line3DVirtualNodeType.generate(id, [material], start, end, size);
    return virtual;
  },
};
