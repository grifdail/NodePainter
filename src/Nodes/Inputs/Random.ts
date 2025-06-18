import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { Constraints } from "../../Utils/applyConstraints";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../Utils/enforceCorrectVectorTypeForNode";
import { createOrSelectFromCache } from "../../Utils/useCache";

export const Random: NodeDefinition = {
  id: "Random",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
  dataOutputs: [Port.number("value")],
  settings: [],
  availableTypes: portTypesWithProperty("vectorLength"),
  onChangeType: changeTypeGenerator([], ["value"]),
  hasOutput: hasInputGenerator(portTypesWithProperty("vectorLength")),
  getData: (portId, nodeData, context) => {
    const value = createOrSelectFromCache(context, nodeData, () =>
      enforceCorrectVectorTypeForNode(
        nodeData,
        Array.from(Array(PortTypeDefinitions[nodeData.selectedType].vectorLength).keys()).map(() => context.RNG.next())
      )
    );

    return value;
  },
};
