import { IconRectangle } from "@tabler/icons-react";
import { MaterialData } from "../../Types/MaterialData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector3 } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const DrawBox: NodeDefinition = {
  id: "DrawBox",
  label: "Draw Box",
  description: "Draw a box",
  icon: IconRectangle,
  tags: ["3D"],
  dataInputs: [
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
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
  ],
  dataOutputs: [
    {
      id: "object",
      type: "object3d",
      defaultValue: null,
    },
  ],
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  execute: (data, context) => {},
  getData(portId, node, context) {
    var material = context.getInputValueMaterial(node, "material") as MaterialData;

    var rotation = context.getInputValueVector3(node, "rotation");
    var position = context.getInputValueVector3(node, "position");
    var dimension = context.getInputValueVector3(node, "dimension");
    const id = context.getCallId(node);
    const virtual = VirtualNodes.BoxType.generate(id, [material], position, rotation, dimension);
    return virtual;
  },
};
