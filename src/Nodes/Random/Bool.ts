import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { addAdvancedCacheOptionContextMenu } from "../../Utils/graph/execution/addAdvancedCacheOptionContextMenu";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const BoolNode: NodeDefinition = {
    id: "Random/Bool",
    label: "Random Boolean",
    description: "A random coin toss with a specific probability",
    icon: IconArrowsShuffle,
    tags: ["Random"],
    dataInputs: [
        {
            id: "probability",
            type: "number",
            defaultValue: 0.5,
        },
        Port.CacheId(),
    ],
    dataOutputs: [{ id: "value", type: "bool", defaultValue: 0 }],

    settings: [],
    getData: (portId, node, context) => {
        var probability = context.getInputValueNumber(node, "probability");
        const r = readFromCacheWithVersion(context, node, () => context.RNG.next());
        return r < probability;
    },
    contextMenu: addAdvancedCacheOptionContextMenu()
};
