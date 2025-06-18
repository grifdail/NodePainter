import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Constraints } from "../../Utils/graph/applyConstraints";
import { createOrSelectFromCache } from "../../Utils/useCache";

export const RandomInt: NodeDefinition = {
  id: "RandomInt",
  description: "A random value between to integer, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [
    {
      id: "min",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "max",
      type: "number",
      defaultValue: 6,
    },
    Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()]),
  ],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],

  settings: [],
  getData: (portId, nodeData, context) => {
    var min = context.getInputValueNumber(nodeData, "min");
    var max = context.getInputValueNumber(nodeData, "max");
    const r = createOrSelectFromCache(context, nodeData, () => context.RNG.next());
    return Math.floor(r * (max - min) + min);
  },
};
