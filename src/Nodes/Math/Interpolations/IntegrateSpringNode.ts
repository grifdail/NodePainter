import { IconTrendingDown3 } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { vectorAddition, vectorLimitMagnitude, vectorScale, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const IntegrateSpringNode: NodeDefinition = {
    id: "Math/Interpolation/IntegrateSpring",
    tags: ["Math"],
    icon: IconTrendingDown3,
    description: "Simulate a spring, trying to reach target",
    featureLevel: 10,
    dataInputs: [
        Port.number("position", 1),
        Port.number("velocity", 1),
        Port.number("target", 1),
        Port.number("stiffness", 100),
        Port.number("damping", 0.75),
        Port.number("velocityScale", 1),
        Port.number("maxVelocity", Math.pow(10, 100)),
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
    ...changeTypeGenerator(portTypesWithTags(["common", "spatial"]), ["position", "target", "velocity"], ["next-position", "next-velocity"]),
    getData: (portId, nodeData, context) => {
        const position = context.getInputValueVector(nodeData, "position");
        const velocity = context.getInputValueVector(nodeData, "velocity");
        const target = context.getInputValueVector(nodeData, "target");
        const deltaTime = context.getInputValueNumber(nodeData, "deltaTime");
        const stiffness = context.getInputValueNumber(nodeData, "stiffness");
        const damping = context.getInputValueNumber(nodeData, "damping");
        const maxVelocity = context.getInputValueNumber(nodeData, "maxVelocity");
        const velocityScale = context.getInputValueNumber(nodeData, "velocityScale");


        var delta = vectorSubstraction(target, position);
        var acceleration = vectorScale(delta, stiffness * deltaTime);
        var nextVelocity = vectorLimitMagnitude(vectorScale(vectorAddition(velocity, vectorScale(acceleration, deltaTime)), Math.pow(damping, deltaTime)), maxVelocity)
        var nextPosition = vectorAddition(position, vectorScale(nextVelocity, velocityScale * deltaTime))
        if (portId === "next-position") {
            return enforceCorrectVectorTypeForNode(nodeData, nextPosition);
        } else {
            return enforceCorrectVectorTypeForNode(nodeData, nextVelocity);
        }
    },
};
