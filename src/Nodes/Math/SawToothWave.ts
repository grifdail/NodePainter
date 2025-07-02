import { IconWaveSine } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const SawToothWave: NodeDefinition = {
  id: "SawToothWave",
  tags: ["Math"],
  icon: IconWaveSine,
  featureLevel: 5,
  description: "Return the value of the sawtooth wave with a phase, frequency and amplitude. Easier than using Cos",
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

    return ((time * frequency + phase) % 1) * amplitude;
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "output", ["time", "phase", "frequency", "amplitude"], ({ time, phase, frequency, amplitude }) => `mod(${time} * ${frequency} + ${phase}, 1.0) * ${amplitude}`);
  },
};
