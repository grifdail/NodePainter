import { IconArrowsShuffle, IconSphere } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";

export const OnCircleNode: NodeDefinition = {
    id: "Random/OnCircle",
    label: "Random on Circle",
    description: "A random value on the perimeter of a circle, consistant across frames",
    icon: DoubleIconGen(IconArrowsShuffle, IconSphere),
    tags: ["Input"],
    dataInputs: [Port.CacheId()],
    dataOutputs: [Port.vector2("value")],
    settings: [],
    getData: (portId, nodeData, context) => {
        const value = readFromCache(context, nodeData, () => [context.RNG.next(), context.RNG.next()]);
        const [rx] = value;
        const c = rx * Math.PI * 2;
        return [Math.cos(c), Math.sin(c)];
    },
};
