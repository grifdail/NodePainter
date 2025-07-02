import { IconAngle, IconArrowUpRightCircle } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2, createVector3 } from "../../../Types/vectorDataType";
import { createMultiTypeNodeDefinition } from "../../../Utils/graph/definition/createMultyTypeNodeDefinition";

export const VectorFromAngle: NodeDefinition = createMultiTypeNodeDefinition(
  {
    id: "Math/Vector/VectorFromAngle",
    alias: "Polar coordinate",
    description: "Create a vector based on an Angle and a magnitude",
    icon: DoubleIconGen(IconArrowUpRightCircle, IconAngle),
    featureLevel: 4,
    tags: ["Vector", "Math"],
    settings: [],
    codeBlockType: "expression",
  },
  {
    vector2: {
      dataInputs: [
        {
          id: "angle",
          type: "number",
          defaultValue: 0,
        },
        {
          id: "length",
          type: "number",
          defaultValue: 1,
        },
      ],
      dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector2() }],
      getData: (portId, nodeData, context) => {
        const angle = context.getInputValueNumber(nodeData, "angle");
        const length = context.getInputValueNumber(nodeData, "length");
        const cos = Math.cos(angle) * length;
        const sin = Math.sin(angle) * length;
        return createVector2(cos, sin);
      },
    },
    vector3: {
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
    },
  }
);
