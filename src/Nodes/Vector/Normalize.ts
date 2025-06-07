import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { EnforceGoodType, VectorNormalize } from "../../Utils/vectorUtils";

export const Normalize: NodeDefinition = {
  id: "Normalize",
  description: "Return a vector sharing the same direction but with a length of one",
  alias: "Unit",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
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

  settings: [],
  availableTypes: portTypesWithTags(["common", "true-vector"], ["array"]),
  onChangeType: changeTypeGenerator(["vec"], ["out"]),
  hasInput: hasInputGenerator(portTypesWithTags(["common", "true-vector"], ["array"])),
  hasOutput: hasInputGenerator(portTypesWithTags(["common", "true-vector"], ["array"])),
  getData: (portId, nodeData, context) => {
    const a = context.getInputValueVector(nodeData, "vec");
    const vec = VectorNormalize(a);
    return EnforceGoodType(nodeData, vec);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["vec"], ({ vec }) => `normalize(${vec})`);
  },
};
