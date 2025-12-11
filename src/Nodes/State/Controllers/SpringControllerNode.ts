import { IconArrowBigRightFilled, IconDeviceGamepad2 } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { Vector } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { processAndUpdateCache, useFrameCache } from "../../../Utils/graph/execution/blackboardCache";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { vectorAddition, vectorLimitMagnitude, vectorScale, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const SpringController: NodeDefinition = {
    id: "State/Controller/SpringController",
    icon: DoubleIconGen(IconDeviceGamepad2, IconArrowBigRightFilled),
    description: "Simulate moving toward a target like a spring",

    dataInputs: [//
        Port.vector2("target"),
        Port.number("velocityScale", 1),
        Port.number("stiffness", 0.5),
        Port.number("damping", 0.5),
        Port.number("maxVelocity", 99999999999),
        Port.vector2("startPosition"),
        Port.bool("reset", false),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position")],
    tags: ["State"],
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["vector", "common"], ["array"]), ["startPosition", "target"], ["position"]),
    getData(portId, node, context) {
        return enforceCorrectVectorTypeForNode(node, (useFrameCache(context, node, () => {
            const reset = context.getInputValueBoolean(node, "reset");
            return processAndUpdateCache(context, node, getDefaultValue, ({ position, velocity }) => {
                const target = context.getInputValueVector(node, "target");
                const deltaTime = context.deltaTime;
                const velocityScale = context.getInputValueNumber(node, "velocityScale");
                const stiffness = context.getInputValueNumber(node, "stiffness");
                const damping = context.getInputValueNumber(node, "damping");
                const maxVelocity = context.getInputValueNumber(node, "maxVelocity");

                const delta = vectorSubstraction(target, position);
                const acceleration = vectorScale(delta, stiffness * deltaTime);
                const nextVelocity = vectorLimitMagnitude(vectorScale(vectorAddition(velocity, vectorScale(acceleration, deltaTime)), Math.pow(damping, deltaTime)), maxVelocity)
                const nextPosition = vectorAddition(position, vectorScale(nextVelocity, velocityScale * deltaTime))

                return {
                    position: nextPosition as Vector,
                    velocity: nextVelocity as Vector,
                }
            }, undefined, reset)




            function getDefaultValue() {
                return {
                    position: context.getInputValueVector(node, "startPosition"),
                    velocity: context.getInputValueVector(node, "startPosition").map(a => 0)
                }
            }
        }) as Record<string, any>)[portId])

    },
};
