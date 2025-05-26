import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorLength, VectorTypesFull } from "../../Types/PortType";
import { Port } from "../../Types/PortTypeGenerator";
import { Constraints } from "../../Utils/applyConstraints";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/useCache";
import { EnforceGoodType } from "../../Utils/vectorUtils";

export const Random: NodeDefinition = {
  id: "Random",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
  dataOutputs: [Port.number("value")],
  settings: [],
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator([], ["value"]),
  hasOutput: hasInputGenerator(VectorTypesFull),
  getData: (portId, nodeData, context) => {
    const value = createOrSelectFromCache(context, nodeData, () =>
      EnforceGoodType(
        nodeData,
        Array.from(Array(VectorLength[nodeData.selectedType]).keys()).map(() => context.RNG.next())
      )
    );

    return value;
  },
};
