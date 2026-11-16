import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

const EdgeTypes = ["Both", "Rising", "Falling"] as const;
type EdgeType = (typeof EdgeTypes)[number];

export const EdgeNode: NodeDefinition = {
    id: "State/Edge",
    label: "Edge",
    icon: IconCircuitSwitchOpen,
    description: "Output true only on when the input has just changed. Can be configured to only output when switch from false to true, the opposite or both",

    dataInputs: [Port.bool("in"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    settings: [{ id: "Edge", type: "dropdown", defaultValue: "Both", options: EdgeTypes.slice() }],
    getData(portId, node, context) {
        return readFromCacheWithVersion<[any, any]>(context, node, (previous) => {
            const edge = node.settings["Edge"] as EdgeType;
            const current = context.getInputValueBoolean(node, "in");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            if (previous === undefined) {
                previous = [true, current];
            }

            if (current !== previous[1]) {
                if (edge === "Both") {
                    return [true, current];
                }
                if (edge === "Rising" && !previous && current) {
                    return [true, current];
                }
                if (edge === "Falling" && previous && !current) {
                    return [true, current];
                }
            }
            return [false, current];;
        })[0]
    },
};
