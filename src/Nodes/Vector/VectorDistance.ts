import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/graph/changeTypeGenerator";
import { vectorDistance } from "../../Utils/math/vectorUtils";

export const Distance: NodeDefinition = {
  id: "Distance",
  description: "Return the distance between two value",
  icon: IconMathXPlusY,
  featureLevel: 90,
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

  settings: [],
  availableTypes: portTypesWithTags(["common", "vector"], ["array"]),
  onChangeType: changeTypeGenerator(["a", "b"], []),
  hasInput: hasInputGenerator(portTypesWithTags(["common", "vector"], ["array"])),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    return vectorDistance(a, b);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `(${a} - ${b}).length`);
  },
};
