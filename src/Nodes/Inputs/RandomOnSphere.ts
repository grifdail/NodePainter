import { IconArrowsShuffle, IconSphere } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { Constraints } from "../../Utils/graph/applyConstraints";
import { createOrSelectFromCache } from "../../Utils/useCache";

export const RandomOnSphere: NodeDefinition = {
  id: "RandomOnSphere",
  description: "A random value, consistant across frames",
  icon: DoubleIconGen(IconArrowsShuffle, IconSphere),
  tags: ["Input"],
  dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
  dataOutputs: [{ id: "value", type: "vector3", defaultValue: createVector3() }],
  settings: [],
  availableTypes: ["vector2", "vector3"],
  onChangeType: changeTypeGenerator([], ["value"]),
  hasOutput: hasInputGenerator(["vector2", "vector3"]),
  getData: (portId, nodeData, context) => {
    const value = createOrSelectFromCache(context, nodeData, () => [context.RNG.next(), context.RNG.next()]);
    const [rx, ry] = value;
    if (nodeData.selectedType === "vector3") {
      // https://mathworld.wolfram.com/SpherePointPicking.html
      const theta = rx * Math.PI * 2;
      const u = ry * 2 - 1;
      const c = Math.sqrt(1 - u * u);

      return [c * Math.cos(theta), u, c * Math.sin(theta)];
    } else {
      const c = rx * Math.PI * 2;
      return [Math.cos(c), Math.sin(c)];
    }
  },
};
