import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";

export const RangeNode: NodeDefinition = {
    id: "Random/Range",
    label: "Random Range",
    description: "A random value between two number",
    icon: IconArrowsShuffle,
    tags: ["Random"],
    dataInputs: [
        {
            id: "min",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "max",
            type: "number",
            defaultValue: 10,
        },
        Port.CacheId(),
    ],
    dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],

    settings: [],
    getData: (portId, node, context) => {
        var min = context.getInputValueNumber(node, "min");
        var max = context.getInputValueNumber(node, "max");
        const r = readFromCache(context, node, () => context.RNG.next());
        return r * (max - min) + min;
    },
};
