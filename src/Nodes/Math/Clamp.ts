import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const Clamp: NodeDefinition = {
  id: "Clamp",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Constrain a number to be between two other number",
  dataInputs: [
    {
      id: "value",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "min",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "max",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  availableTypes: VectorTypesFull,
  defaultType: "number",
  onChangeType: changeTypeGenerator(["value"], ["result"]),
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var value = context.getInputValueVector(nodeData, "value");
      var min = context.getInputValueNumber(nodeData, "min");
      var max = context.getInputValueNumber(nodeData, "max");
      return value.map((v) => Math.max(Math.min(v, max), min));
    }
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "result", ["value", "min", "max"], ({ value, min, max }) => `clamp(${value}, ${min}, ${max})`);
  },
};
