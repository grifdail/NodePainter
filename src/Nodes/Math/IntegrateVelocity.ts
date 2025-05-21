import { IconTrendingDown3 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesPosition } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { EnforceGoodType, VectorAddition, VectorScale } from "../../Utils/vectorUtils";

export const IntegrateVelocity: NodeDefinition = {
  id: "IntegrateVelocity",
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
  availableTypes: VectorTypesPosition,
  onChangeType: changeTypeGenerator(["position", "acceleration", "velocity"], ["next-position", "next-velocity"]),
  getData: (portId, nodeData, context) => {
    const decelerationRate = context.getInputValueNumber(nodeData, "decelerationRate");
    const velocityScale = context.getInputValueNumber(nodeData, "velocityScale");
    const acceleration = context.getInputValueVector(nodeData, "acceleration");
    const position = context.getInputValueVector(nodeData, "position");
    const velocity = context.getInputValueVector(nodeData, "velocity");
    if (portId === "next-position") {
      return EnforceGoodType(nodeData, VectorAddition(position, VectorScale(velocity, velocityScale)));
    } else {
      return EnforceGoodType(nodeData, VectorScale(VectorAddition(velocity, acceleration), decelerationRate));
    }
  },
};
