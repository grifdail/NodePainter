import { IconArrowsShuffle, IconSphere } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const InsideSphereNode: NodeDefinition = {
    id: "Random/InsideSphere",
    label: "Random Inside Sphere",
    description: "A random value uniformely distributed inside a sphere, consistant across frames",
    icon: DoubleIconGen(IconArrowsShuffle, IconSphere),
    tags: ["Input"],
    dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
    dataOutputs: [Port.vector3("value")],
    settings: [],
    getData: (portId, node, context) => {
        const [rx, ry, rz] = readFromCache(context, node, () => [context.RNG.next(), context.RNG.next(), context.RNG.next()]);

        // https://karthikkaranth.me/blog/generating-random-points-in-a-sphere/
        const theta = rx * Math.PI * 2;
        const u = ry * 2 - 1;
        const c = Math.sqrt(1 - u * u);
        var r = Math.cbrt(rz);

        return [c * Math.cos(theta) * r, u * r, c * Math.sin(theta) * r];
    },
};
