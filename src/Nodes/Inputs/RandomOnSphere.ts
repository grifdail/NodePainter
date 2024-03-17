import { IconArrowsShuffle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { createVector3 } from "../../Data/vectorDataType";

export const RandomOnSphere: NodeDefinition = {
  id: "RandomOnSphere",
  description: "A random value, consistant across frames",
  icon: IconArrowsShuffle,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "value", type: "vector3", defaultValue: createVector3() }],
  executeOutputs: [],
  settings: [],
  defaultType: "vector3",
  availableTypes: ["vector2", "vector3"],
  onChangeType: changeTypeGenerator([], ["value"]),
  getData: (portId, nodeData, context) => {
    if (nodeData.selectedType === "vector3") {
      // https://mathworld.wolfram.com/SpherePointPicking.html
      const theta = context.p5.random() * Math.PI * 2;
      const u = context.p5.random() * 2 - 1;
      const c = Math.sqrt(1 - u * u);

      return [c * Math.cos(theta), u, c * Math.sin(theta)];
    } else {
      const c = context.p5.random() * Math.PI * 2;
      return [Math.cos(c), Math.sin(c)];
    }
  },
};
