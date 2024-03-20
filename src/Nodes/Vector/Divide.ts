import { IconMathXDivideY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { createVector2 } from "../../Types/vectorDataType";
import { VectorDivision } from "../../Utils/vectorUtils";
import { EnforceGoodType } from "../../Utils/vectorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { VectorTypesFull } from "../../Types/PortType";

export const Divide: NodeDefinition = {
  id: "Divide",
  description: "Scale each component of two vector together",
  icon: IconMathXDivideY,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector2(1, 1),
    },
    {
      id: "b",
      type: "vector2",
      defaultValue: createVector2(1, 1),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(1, 1),
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["a", "b"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    return EnforceGoodType(nodeData, VectorDivision(a, b));
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} / ${b}`);
  },
};
