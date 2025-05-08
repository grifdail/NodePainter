import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { VectorDistance } from "../../Utils/vectorUtils";

export const Distance: NodeDefinition = {
  id: "Distance",
  description: "Return the distance between two value",
  icon: IconMathXPlusY,
  featureLevel: 100,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "b",
      type: "vector2",
      defaultValue: createVector2(),
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
  defaultType: "vector2",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["a", "b"], []),
  hasInput: hasInputGenerator(VectorTypesFull),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    return VectorDistance(a, b);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `(${a} - ${b}).length`);
  },
};
