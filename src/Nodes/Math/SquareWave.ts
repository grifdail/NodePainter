import { IconWaveSquare } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { Constraints } from "../../Utils/graph/applyConstraints";

export const SquareWave: NodeDefinition = {
  id: "SquareWave",
  tags: ["Math"],
  icon: IconWaveSquare,
  featureLevel: 5,
  description: "Return the value of the square wave with a phase, frequency and amplitude. Easier than using Cos",
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
    Port.number("duty", 0.5, "How much of the cycle is 1", [Constraints.Clamp01()]),
  ],
  dataOutputs: [
    {
      id: "output",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  getData: (portId, nodeData, context) => {
    var time = context.getInputValueNumber(nodeData, "time");
    var phase = context.getInputValueNumber(nodeData, "phase");
    var frequency = context.getInputValueNumber(nodeData, "frequency");
    var amplitude = context.getInputValueNumber(nodeData, "amplitude");
    var duty = context.getInputValueNumber(nodeData, "duty");
    return (time * frequency + phase) % 1 < duty ? amplitude : 0;
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "output", ["time", "phase", "frequency", "amplitude", "duty"], ({ time, phase, frequency, amplitude, duty }) => `((${time} * ${frequency} + ${phase}) % 1.0) <${duty} ? 0.0 :  ${amplitude}`);
  },
};
