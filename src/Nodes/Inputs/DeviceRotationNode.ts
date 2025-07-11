import { IconPhone } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const DeviceRotationNode: NodeDefinition = {
  id: "Input/DeviceRotation",
  label: "Device Rotation",
  description: "The rotation of the phisical device you're using",
  icon: IconPhone,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [
    { id: "x", type: "number", defaultValue: 0 },
    { id: "y", type: "number", defaultValue: 0 },
    { id: "z", type: "number", defaultValue: 0 },
  ],

  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "x") {
      return context.p5.rotationX;
    }
    if (portId === "y") {
      return context.p5.rotationY;
    }
    if (portId === "z") {
      return context.p5.rotationZ;
    }
  },
};
