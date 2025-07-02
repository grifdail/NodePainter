import { IconWaveSine } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const SineWave: NodeDefinition = {
  id: "Math/Wave/SineWave",
  tags: ["Math"],
  icon: IconWaveSine,
  featureLevel: 5,
  description: "Return the value of the sine wave with a phase, frequency and amplitude. Easier than using Cos",
  dataInputs: [
    {
      id: "time",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "phase",
      type: "number",
      defaultValue: 0,

      constrains: [Constraints.Clamp01()],
    },
    {
      id: "frequency",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "amplitude",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "positive",
      type: "bool",
      defaultValue: true,
    },
  ],
  dataOutputs: [
    {
      id: "output",
      type: "number",
      defaultValue: 0,
    },
  ],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    var time = context.getInputValueNumber(nodeData, "time");
    var phase = context.getInputValueNumber(nodeData, "phase");
    var frequency = context.getInputValueNumber(nodeData, "frequency");
    var amplitude = context.getInputValueNumber(nodeData, "amplitude");
    var positive = context.getInputValueNumber(nodeData, "positive");
    var t = Math.cos((time + phase) * 2 * Math.PI * frequency);
    return positive ? (t * 0.5 + 0.5) * amplitude : t * amplitude;
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "output", ["time", "phase", "frequency", "amplitude", "positive"], ({ time, phase, frequency, amplitude, positive }) => `(!${positive} ? cos((${time}+${phase}) * 6.2831855 * ${frequency}) : cos((${time}+${phase}) * 6.2831855 * ${frequency}) * 0.5 + 0.5 ) * ${amplitude}`);
  },
};
