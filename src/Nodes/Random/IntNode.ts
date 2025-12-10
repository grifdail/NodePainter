import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const IntNode: NodeDefinition = {
  id: "Random/Int",
  label: "Random Integer",
  description: "A random value between two integer",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [
    {
      id: "min",
      type: "number",
      defaultValue: 0,
      constrains: [Constraints.Integer()],
    },
    {
      id: "max",
      type: "number",
      defaultValue: 6,
      constrains: [Constraints.Integer()],
    },
    Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()]),
  ],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],

  settings: [],
  getData: (portId, nodeData, context) => {
    var min = context.getInputValueNumber(nodeData, "min");
    var max = context.getInputValueNumber(nodeData, "max");
    const r = readFromCache(context, nodeData, () => context.RNG.next());
    return Math.floor(r * (max - min) + min);
  },
};
