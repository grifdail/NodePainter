import { IconStatusChange } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { useCache } from "../../Utils/graph/execution/blackboardCache";

export const ChangeNode: NodeDefinition = {
    id: "State/Change",
    label: "Change",
    icon: IconStatusChange,
    description: "Output the difference between the input value from this frame and the previous call",

    dataInputs: [Port.bool("in"), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    ...changeTypeGenerator(portTypesWithProperty("subtractionOperator"), ["in"], ["out"]),
    settings: [],
    getData(portId, node, context) {
        const current = context.getInputValue(node, "in", node.selectedType);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [previous, setValue] = useCache(context, node);
        setValue(current)
        const differenciator = PortTypeDefinitions[node.selectedType].subtractionOperator;
        if (differenciator) {
            return differenciator(current, previous);
        }
        return PortTypeDefinitions[node.selectedType].createDefaultValue();
    },
};
