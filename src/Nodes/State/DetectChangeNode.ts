import { IconStatusChange } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const DetectChangeNode: NodeDefinition = {
    id: "State/DetectChange",
    label: "Detect Change",
    icon: IconStatusChange,
    description: "Output true only on when the input has just changed. Can be configured to only output when switch from false to true, the opposite or both",

    dataInputs: [Port.bool("in"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    ...changeTypeGenerator(portTypesWithProperty("equalityOperator"), ["in"], []),
    settings: [],
    getData(portId, node, context) {
        return readFromCacheWithVersion<[boolean, any]>(context, node, (previous) => {
            const current = context.getInputValue(node, "in", node.selectedType);
            if (previous === undefined) {
                previous = [true, current];
            }
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const comparator = PortTypeDefinitions[node.selectedType].equalityOperator;
            if (comparator && !comparator(current, previous[1])) {
                return [true, current];
            }
            return [false, current];
        })[0]
    },
};
