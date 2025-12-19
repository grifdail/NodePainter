import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { processAndUpdateCache, useFrameCache } from "../../../Utils/graph/execution/blackboardCache";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { vectorAddition, vectorLimitMagnitude, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const LinearControllerNode: NodeDefinition = {
    id: "State/Controller/LinearController",
    icon: DoubleIconGen(IconDeviceGamepad2, IconVideo),
    description: "Simulate moving toward a target at a linear speed",

    dataInputs: [//
        Port.vector2("target"),
        Port.number("speed"),
        Port.vector2("startPosition"),
        Port.bool("reset", false),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position")],
    tags: ["State"],
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["vector", "common"], ["array"]), ["startPosition", "target"], ["position"]),
    getData(portId, node, context) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (useFrameCache(context, node, () => {
            const reset = context.getInputValueBoolean(node, "reset");
            return processAndUpdateCache(context, node, getDefaultValue, ({ position: current }) => {
                const target = context.getInputValueVector(node, "target");
                const deltaTime = context.deltaTime;
                const speed = context.getInputValueNumber(node, "speed");

                const delta = vectorSubstraction(target, current);
                const displacement = vectorLimitMagnitude(delta, speed * deltaTime);
                return {
                    position: enforceCorrectVectorTypeForNode(node, vectorAddition(current, displacement))
                }
            }, undefined, reset)




            function getDefaultValue() {
                return {
                    position: context.getInputValueVector(node, "startPosition")
                }
            }
        }) as Record<string, any>)[portId]

    },
};

