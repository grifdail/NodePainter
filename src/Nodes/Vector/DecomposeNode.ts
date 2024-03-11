import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2 } from "../../Data/vectorDataType";
import { VectorTypeslimited } from "../../Data/vectorUtils";
import { convertTypeValue } from "../../Data/convertTypeValue";
import { genShader } from "../../Data/genShader";

export const DecomposeNode: NodeDefinition = {
  id: "Decompose",
  description: "split a vector or a number into its individual components",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "0",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "1",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: [...VectorTypeslimited, "color"],
  onChangeType(node, type) {
    var count = { vector2: 2, vector3: 3, vector4: 4, color: 4 }[type as string] as number;
    for (var i = 0; i < 4; i++) {
      if (i >= count) {
        if (node.dataOutputs[i.toString()] !== undefined) {
          delete node.dataOutputs[i.toString()];
        }
      } else {
        let port = node.dataOutputs[i.toString()];
        if (port === undefined) {
          port = {
            id: i.toString(),
            type: "number",
            defaultValue: 0,
            label: "w",
          };
          node.dataOutputs[i.toString()] = port;
        }
        port.label = type === "color" ? "rgba"[i] : "xyzw"[i];
      }
    }

    node.dataInputs["vec"].ownValue = convertTypeValue(node.dataInputs["vec"].ownValue, node.dataInputs["vec"].type, type);
    node.dataInputs["vec"].type = type;
  },
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    if (portId === "0") {
      return vec[0];
    }
    if (portId === "1") {
      return vec[1];
    }
    if (portId === "2") {
      return vec[2];
    }
    if (portId === "3") {
      return vec[3];
    }
  },
  getShaderCode(node, context) {
    return Object.keys(node.dataOutputs)
      .map((id, i) => genShader(node, context, id, ["vec"], ({ vec }) => `${vec}.${"xyzw"[i]}`))
      .join("\n");
  },
};
