import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector3 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";

export const RandomOnSphere: NodeDefinition = {
  id: "RandomOnSphere",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "value", type: "vector3", defaultValue: createVector3() }],

  settings: [],
  defaultType: "vector3",
  availableTypes: ["vector2", "vector3"],
  onChangeType: changeTypeGenerator([], ["value"]),
  hasOutput: hasInputGenerator(["vector2", "vector3"]),
  getData: (portId, nodeData, context) => {
    if (nodeData.selectedType === "vector3") {
      // https://mathworld.wolfram.com/SpherePointPicking.html
      const theta = context.RNG.next() * Math.PI * 2;
      const u = context.RNG.next() * 2 - 1;
      const c = Math.sqrt(1 - u * u);

      return [c * Math.cos(theta), u, c * Math.sin(theta)];
    } else {
      const c = context.RNG.next() * Math.PI * 2;
      return [Math.cos(c), Math.sin(c)];
    }
  },
};
