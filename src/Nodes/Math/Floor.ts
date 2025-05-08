import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { EnforceGoodType } from "../../Utils/vectorUtils";

export const Floor: NodeDefinition = {
  id: "Floor",
  description: "Round down a number to the largest interger smaller or equal to itself.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "x",
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
  executeOutputs: [],
  settings: [],
  defaultType: "number",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["x"], ["out"]),
  hasInput: hasInputGenerator(VectorTypesFull),
  hasOutput: hasInputGenerator(VectorTypesFull),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "x");
    return EnforceGoodType(
      nodeData,
      a.map((value) => Math.floor(value))
    );
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["x"], ({ x }) => `floor(${x})`);
  },
};
