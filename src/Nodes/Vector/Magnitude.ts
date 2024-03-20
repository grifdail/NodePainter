import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { createVector2 } from "../../Types/vectorDataType";
import { VectorMagnitude } from "../../Utils/vectorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { VectorTypeslimited } from "../../Types/PortType";

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
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: VectorTypeslimited,
  onChangeType: changeTypeGenerator(["vec"], []),
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    return VectorMagnitude(vec);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "length", ["vec"], ({ vec }) => `length(${vec})`);
  },
};
