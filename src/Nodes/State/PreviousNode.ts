import { IconArrowNarrowLeft, IconStatusChange } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const PreviousNode: NodeDefinition = {
    id: "State/Previous",
    label: "Previous",
    icon: DoubleIconGen(IconStatusChange, IconArrowNarrowLeft),
    description: "Output the value of the input at the previous call",

    dataInputs: [Port.bool("in"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    ...changeTypeGenerator(portTypesWithTags(["common"]), ["in"], ["out"]),
    settings: [],
    getData(portId, node, context) {
        return readFromCacheWithVersion<[any, any]>(context, node, (previous) => {
            const current = context.getInputValue(node, "in", node.selectedType);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            if (previous === undefined) {
                previous = [current, current]
            }

            return [previous[1], current];
        })[0]
    },
};
