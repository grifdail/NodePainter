import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { createVector3 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorProject } from "../../../Utils/math/vectorUtils";

export const ProjectNode: NodeDefinition = {
  id: "Math/Vector/Project",
  label: "Project Vector",
  description: "Project the vector A on vector B",
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
  ...changeTypeGenerator(portTypesWithTags(["common", "true-vector"], ["array"]), ["a", "b"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector3(nodeData, "a");
    var b = context.getInputValueVector3(nodeData, "b");
    return vectorProject(a, b);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
  },
};
