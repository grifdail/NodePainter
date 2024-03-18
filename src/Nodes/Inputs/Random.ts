import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorLength } from "../../Types/PortType";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { EnforceGoodType } from "../../Utils/vectorUtils";

export const Random: NodeDefinition = {
  id: "Random",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator([], ["value"]),
  defaultType: "number",
  getData: (portId, nodeData, context) => {
    return EnforceGoodType(
      nodeData,
      Array.from(Array(VectorLength[nodeData.selectedType]).keys()).map(() => context.p5.random())
    );
  },
};
