import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector3 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorReject } from "../../../Utils/math/vectorUtils";

export const RejectNode: NodeDefinition = {
  id: "Math/Vector/RejectNode",
  label: "Reject Vector",
  description: "Project the vector A on a vector or plane that's perpendicular to vector b",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector3",
      defaultValue: createVector3(),
    },
    {
      id: "b",
      type: "vector3",
      defaultValue: createVector3(),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector3",
      defaultValue: createVector3(),
    },
  ],

  codeBlockType: "expression",
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common", "true-vector"], ["array"]), ["a", "b"], []),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector3(nodeData, "a");
    var b = context.getInputValueVector3(nodeData, "b");
    return vectorReject(a, b);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
  },
};
