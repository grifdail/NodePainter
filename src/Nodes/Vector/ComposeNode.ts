import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { createPortConnection } from "../../Utils/createPortConnection";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const ComposeNode: NodeDefinition = {
  id: "Compose",
  description: "Create a vector or color from a set of number",
  icon: IconArrowUpRightCircle,
  featureLevel: 3,
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
  ],
  dataOutputs: [{ id: "out", type: "vector2", defaultValue: createVector2() }],

  settings: [],
  availableTypes: portTypesWithProperty("componentNames"),
  onChangeType(node, type) {
    var count = PortTypeDefinitions[type].vectorLength || 4;
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
        var source = PortTypeDefinitions[type].componentNames || [];
        port.label = source[i];
      }
    }
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, nodeData, context) => {
    var vectorLength = PortTypeDefinitions[nodeData.selectedType].vectorLength || 2;
    return new Array(vectorLength).fill(null).map((_, i) => context.getInputValueNumber(nodeData, i.toString()));
  },
  getShaderCode(node, context) {
    if (node.selectedType === "vector3") {
      return generateShaderCodeFromNodeData(node, context, "out", ["0", "1", "2"], (args) => `vec3(${args[0]}, ${args[1]}, ${args[2]})`);
    } else if (node.selectedType === "vector4" || node.selectedType === "color") {
      return generateShaderCodeFromNodeData(node, context, "out", ["0", "1", "2", "3"], (args) => `vec4(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`);
    } else {
      return generateShaderCodeFromNodeData(node, context, "out", ["0", "1"], (args) => `vec2(${args[0]}, ${args[1]})`);
    }
  },
};
