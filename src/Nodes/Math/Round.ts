import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { EnforceGoodType } from "../../Utils/vectorUtils";

export const Round: NodeDefinition = {
  id: "Round",
  description: "Round down a number to the nearest interger.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "input",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["input"], ["out"]),
  hasInput: hasInputGenerator(VectorTypesFull),
  hasOutput: hasInputGenerator(VectorTypesFull),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "input");
    return EnforceGoodType(
      nodeData,
      a.map((value) => Math.round(value))
    );
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `sign(${input})*floor(abs(${input})+0.5);`);
  },
};
