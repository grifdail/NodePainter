import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";

export const GaussianNode: NodeDefinition = {
  id: "Random/Gaussian",
  label: "Random Gaussian",
  description: "A random value between two number",
  icon: IconArrowsShuffle,
  tags: ["Random"],
  dataInputs: [
    //
    Port.number("mean", 0),
    Port.number("stdev", 1, "Standard deviation"),
    Port.CacheId(),
  ],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],

  settings: [],
  getData: (portId, nodeData, context) => {
    var mean = context.getInputValueNumber(nodeData, "mean");
    var stdev = context.getInputValueNumber(nodeData, "stdev");
    const z = readFromCache(context, nodeData, () => {
      const u = 1 - context.RNG.next(); // Converting [0,1) to (0,1]
      const v = context.RNG.next();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      return z;
    });

    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
  },
};
