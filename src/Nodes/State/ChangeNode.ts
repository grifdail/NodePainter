import { IconStatusChange } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const ChangeNode: NodeDefinition = {
    id: "State/Change",
    label: "Change",
    icon: IconStatusChange,
    description: "Output the difference between the input value from this frame and the previous call",

    dataInputs: [Port.bool("in"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    ...changeTypeGenerator(portTypesWithProperty("subtractionOperator"), ["in"], ["out"]),
    settings: [],
    getData(portId, node, context) {
        const result = readFromCacheWithVersion<[any, any]>(context, node, (previous) => {
            const current = context.getInputValue(node, "in", node.selectedType) as any;
            if (!previous) {
                previous = [null, current]
            }

            const differenciator = PortTypeDefinitions[node.selectedType].subtractionOperator;
            if (differenciator) {
                return [differenciator(current, previous[1]), current];
            }
            return previous;
        })

        return result[0]

    },
};
