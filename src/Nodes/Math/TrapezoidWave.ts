import { IconWaveSquare } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { Constraints } from "../../Utils/graph/applyConstraints";
import { clamp01 } from "../../Utils/math/clamp01";

export const TrapezoidWave: NodeDefinition = {
  id: "TrapezoidWave",
  tags: ["Math"],
  icon: IconWaveSquare,
  featureLevel: 5,
  description: "Return the value of the trapezoid wave with a phase, frequency, amplitude, duty cycle and ratio",
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
    Port.number("transition", 0.5, "How much of the duty cycle is a transition", [Constraints.Clamp01()]),
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
    var transition = context.getInputValueNumber(nodeData, "transition");
    var a = (time * frequency + phase) % 1;
    return (a < duty ? clamp01(a / duty / transition) : clamp01(1 - (a - duty) / (1 - duty) / transition)) * amplitude;
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "output", ["time", "phase", "frequency", "amplitude", "duty"], ({ time, phase, frequency, amplitude, duty }) => `((${time} * ${frequency} + ${phase}) % 1.0) <${duty} ?  ${amplitude} : 0.0`);
  },
};
