import { IconArrowsShuffle, IconSphere } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const OnSphereNode: NodeDefinition = {
  id: "Random/OnSphere",
  label: "Random on Sphere",
  description: "A random value on the surface of a sphere, consistant across frames",
  icon: DoubleIconGen(IconArrowsShuffle, IconSphere),
  tags: ["Input"],
  dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
  dataOutputs: [Port.vector3("value")],
  settings: [],
  getData: (portId, nodeData, context) => {
    const value = createOrSelectFromCache(context, nodeData, () => [context.RNG.next(), context.RNG.next()]);
    const [rx, ry] = value;
    // https://mathworld.wolfram.com/SpherePointPicking.html
    const theta = rx * Math.PI * 2;
    const u = ry * 2 - 1;
    const c = Math.sqrt(1 - u * u);

    return [c * Math.cos(theta), u, c * Math.sin(theta)];
  },
};
