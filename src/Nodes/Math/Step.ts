import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { Constraints } from "../../Utils/applyConstraints";
import { clamp01 } from "../../Utils/colorUtils";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Step: NodeDefinition = {
  id: "Step",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Constrain a number between 0 and 1 to a specific number of discreet step.",
  dataInputs: [
    {
      id: "value",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "step",
      type: "number",
      defaultValue: 0,
      constrains: [Constraints.Integer(), Constraints.Positive()],
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "number",
      defaultValue: 5,
    },
  ],
  executeOutputs: [],
  settings: [],
  availableTypes: VectorTypesFull,
  defaultType: "number",
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var value = context.getInputValueNumber(nodeData, "value");
      var step = context.getInputValueNumber(nodeData, "step");
      return Math.floor(clamp01(value) * step) / step;
    }
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "result", ["value", "step"], ({ value, step }) => `floor(clamp(${value},0.0, 1.0) * ${step}) / ${step}`);
  },
};
