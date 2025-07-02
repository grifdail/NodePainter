import { IconTrendingDown3 } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";

export const IntegrateVelocity: NodeDefinition = {
  id: "Math/IntegrateVelocity",
  tags: ["Math"],
  icon: IconTrendingDown3,
  description: "Simulate the application of a force and return the next position and velocity",
  featureLevel: 10,
  dataInputs: [
    {
      id: "position",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "velocity",
      type: "number",
      defaultValue: -1,
    },
    {
      id: "acceleration",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "velocityScale",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "decelerationRate",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [
    {
      id: "next-position",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "next-velocity",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common", "spatial"]), ["position", "acceleration", "velocity"], ["next-position", "next-velocity"]),
  getData: (portId, nodeData, context) => {
    const decelerationRate = context.getInputValueNumber(nodeData, "decelerationRate");
    const velocityScale = context.getInputValueNumber(nodeData, "velocityScale");
    const acceleration = context.getInputValueVector(nodeData, "acceleration");
    const position = context.getInputValueVector(nodeData, "position");
    const velocity = context.getInputValueVector(nodeData, "velocity");
    if (portId === "next-position") {
      return enforceCorrectVectorTypeForNode(nodeData, vectorAddition(position, vectorScale(velocity, velocityScale)));
    } else {
      return enforceCorrectVectorTypeForNode(nodeData, vectorScale(vectorAddition(velocity, acceleration), decelerationRate));
    }
  },
};
