import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createColor, createVector2, createVector3, createVector4 } from "../../Data/vectorDataType";
import { createPortConnection } from "../../Data/createPortConnection";
import { original } from "immer";
import { VectorTypeslimited } from "../../Data/vectorUtils";

export const ComposeNode: NodeDefinition = {
  id: "Compose",
  description: "Create a vector or color from a set of number",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "0",
      type: "number",
      defaultValue: 0,
      label: "x",
    },
    {
      id: "1",
      type: "number",
      defaultValue: 0,
      label: "y",
    },
    {
      id: "2",
      type: "number",
      defaultValue: 0,
      label: "z",
    },
    {
      id: "3",
      type: "number",
      defaultValue: 0,
      label: "w",
    },
  ],
  dataOutputs: [{ id: "out", type: "vector4", defaultValue: createVector2() }],
  executeOutputs: [],
  settings: [],
  defaultType: "vector4",
  availableTypes: [...VectorTypeslimited, "color"],
  onChangeType(node, type) {
    var count = { vector2: 2, vector3: 3, vector4: 4, color: 4 }[type as string] as number;
    console.log(original(node.dataInputs));
    for (var i = 0; i < 4; i++) {
      if (i >= count) {
        if (node.dataInputs[i.toString()] !== undefined) {
          delete node.dataInputs[i.toString()];
        }
      } else {
        let port = node.dataInputs[i.toString()];
        if (port === undefined) {
          port = createPortConnection({
            id: i.toString(),
            type: "number",
            defaultValue: 0,
            label: "w",
          });
          node.dataInputs[i.toString()] = port;
        }
        port.label = type === "color" ? "rgba"[i] : "xyzw"[i];
      }
    }
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, nodeData, context) => {
    if (nodeData.selectedType === "vector3") {
      return createVector3(context.getInputValueNumber(nodeData, "0"), context.getInputValueNumber(nodeData, "1"), context.getInputValueNumber(nodeData, "2"));
    }
    if (nodeData.selectedType === "vector4") {
      return createVector4(context.getInputValueNumber(nodeData, "0"), context.getInputValueNumber(nodeData, "1"), context.getInputValueNumber(nodeData, "2"), context.getInputValueNumber(nodeData, "3"));
    }
    if (nodeData.selectedType === "color") {
      return createColor(context.getInputValueNumber(nodeData, "0"), context.getInputValueNumber(nodeData, "1"), context.getInputValueNumber(nodeData, "2"), context.getInputValueNumber(nodeData, "3"));
    } else {
      return createVector2(context.getInputValueNumber(nodeData, "0"), context.getInputValueNumber(nodeData, "1"));
    }
  },
  getShaderCode(node, context) {
    return genShader(node, context, "vec4", "vec", ["x", "y"], ([x, y]) => `vec4(${x}, ${y}, 0.0, 0.0)`);
  },
};