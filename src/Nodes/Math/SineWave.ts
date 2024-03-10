import { IconWaveSine } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";

export const SineWave: NodeDefinition = {
  id: "SineWave",
  tags: ["Math"],
  icon: IconWaveSine,
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
  executeOutputs: [],
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
    return genShader(node, context, "float", "output", ["time", "phase", "frequency", "amplitude", "positive"], ([time, phase, frequency, amplitude, positive]) => `(!${positive} ? cos((${time}+${phase}) * 6.2831855 * ${frequency}) : cos((${time}+${phase}) * 6.2831855 * ${frequency}) * 0.5 + 0.5 ) * ${amplitude}`);
  },
};
