import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypeslimited } from "../../Types/PortType";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { VectorMagnitude } from "../../Utils/vectorUtils";

export const Magnitude: NodeDefinition = {
  id: "Magnitude",
  description: "Return the length of a vector",
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
      id: "length",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  availableTypes: VectorTypeslimited,
  onChangeType: changeTypeGenerator(["vec"], []),
  hasInput: hasInputGenerator(VectorTypeslimited),
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    return VectorMagnitude(vec);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "length", ["vec"], ({ vec }) => `length(${vec})`);
  },
};
