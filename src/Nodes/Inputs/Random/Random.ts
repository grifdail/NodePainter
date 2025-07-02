import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { createOrSelectFromCache } from "../../../Utils/graph/execution/blackboardCache";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const Random: NodeDefinition = {
  id: "Input/Random/Random",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
  dataOutputs: [Port.number("value")],
  settings: [],
  ...changeTypeGenerator(portTypesWithProperty("vectorLength"), [], ["value"]),
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
