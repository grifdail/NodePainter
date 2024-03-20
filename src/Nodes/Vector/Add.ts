import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { createVector2 } from "../../Types/vectorDataType";
import { VectorAddition } from "../../Utils/vectorUtils";
import { EnforceGoodType } from "../../Utils/vectorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { VectorTypesFull } from "../../Types/PortType";
import { IconMathXPlusY } from "@tabler/icons-react";

export const Add: NodeDefinition = {
  id: "Add",
  description: "Add two value together",
  icon: IconMathXPlusY,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "b",
      type: "vector",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(),
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
    return EnforceGoodType(nodeData, VectorAddition(a, b));
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} + ${b}`);
  },
};
