import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const RandomSignNode: NodeDefinition = {
    id: "Random/Sign",
    label: "Random Sign",
    description: "return either -1 or 1",
    icon: IconArrowsShuffle,
    tags: ["Input"],
    dataInputs: [
        Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()]),
    ],
    dataOutputs: [{ id: "sign", type: "number", defaultValue: 1 }],

    settings: [],
    getData: (portId, node, context) => {
        const r = readFromCache(context, node, () => context.RNG.next() >= 0.5 ? -1 : 1);
        return r;
    },
};
