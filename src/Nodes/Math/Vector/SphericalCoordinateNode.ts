import { IconAngle, IconArrowUpRightCircle } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector3 } from "../../../Types/vectorDataType";

export const SphericalCoordinateNode: NodeDefinition = {
  id: "Math/Vector/SphericalCoordinate",
  alias: "Vector from angle",
  description: "Create a vector based on an Angle and a magnitude",
  icon: DoubleIconGen(IconArrowUpRightCircle, IconAngle),
  featureLevel: 4,
  tags: ["Vector", "Math"],
  settings: [],
  codeBlockType: "expression",
  dataInputs: [
    {
      id: "polar",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "azimut",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "length",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [{ id: "vec", type: "vector3", defaultValue: createVector3() }],
  getData: (portId, nodeData, context) => {
    const polar = context.getInputValueNumber(nodeData, "polar");
    const azimut = context.getInputValueNumber(nodeData, "azimut");
    const length = context.getInputValueNumber(nodeData, "length");
    const x = Math.sin(polar) * Math.cos(azimut) * length;
    const y = Math.cos(polar) * length;
    const z = Math.sin(polar) * Math.sin(azimut) * length;
    return [x, y, z];
  },
};
