import { IconTrendingDown3 } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";

export const IntegrateVelocityNode: NodeDefinition = {
    id: "Math/Interpolation/IntegrateVelocity",
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
        Port.number("deltaTime", 1)
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

    settings: [

    ],
    ...changeTypeGenerator(portTypesWithTags(["common", "spatial"]), ["position", "acceleration", "velocity"], ["next-position", "next-velocity"]),
    getData: (portId, node, context) => {
        const decelerationRate = context.getInputValueNumber(node, "decelerationRate");
        const velocityScale = context.getInputValueNumber(node, "velocityScale");
        const acceleration = context.getInputValueVector(node, "acceleration");
        const position = context.getInputValueVector(node, "position");
        const velocity = context.getInputValueVector(node, "velocity");
        const deltaTime = context.getInputValueNumber(node, "deltaTime");

        if (portId === "next-position") {
            return enforceCorrectVectorTypeForNode(node, vectorAddition(position, vectorScale(velocity, velocityScale * deltaTime)));
        } else {
            return enforceCorrectVectorTypeForNode(node, vectorScale(vectorAddition(velocity, vectorScale(acceleration, deltaTime)), Math.pow(decelerationRate, deltaTime)));
        }
    },
};
