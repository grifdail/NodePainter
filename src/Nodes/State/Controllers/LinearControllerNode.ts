import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
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
        Port.Tick(),
        Port.Reset(),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position")],
    tags: ["State"],
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["vector", "common"], ["array"]), ["startPosition", "target"], ["position"]),
    getData(portId, node, context) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return readFromCacheWithVersion<{ position: any }>(context, node, (previous) => {
            if (!previous) {
                previous = {
                    position: context.getInputValueVector(node, "startPosition")
                }
            }
            const target = context.getInputValueVector(node, "target");
            const deltaTime = context.deltaTime;
            const speed = context.getInputValueNumber(node, "speed");

            const delta = vectorSubstraction(target, previous.position);
            const displacement = vectorLimitMagnitude(delta, speed * deltaTime);
            return {
                position: enforceCorrectVectorTypeForNode(node, vectorAddition(previous.position, displacement))
            }
        }).position



    },
};

