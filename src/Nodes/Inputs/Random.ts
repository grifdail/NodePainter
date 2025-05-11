import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorLength, VectorTypesFull } from "../../Types/PortType";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { EnforceGoodType } from "../../Utils/vectorUtils";

export const Random: NodeDefinition = {
  id: "Random",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [Port.number("value")],
  settings: [],
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator([], ["value"]),
  hasOutput: hasInputGenerator(VectorTypesFull),
  defaultType: "number",
  getData: (portId, nodeData, context) => {
    return EnforceGoodType(
      nodeData,
      Array.from(Array(VectorLength[nodeData.selectedType]).keys()).map(() => context.RNG.next())
    );
  },
};
