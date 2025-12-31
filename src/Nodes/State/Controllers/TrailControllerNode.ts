import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { SettingGenerator } from "../../../Components/Settings/SettingGenerator";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Port } from "../../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { frameCacheSetting } from "../../../Utils/graph/definition/FrameCacheSetting";
import { processAndUpdateCache, useFrameCache } from "../../../Utils/graph/execution/blackboardCache";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const TrailControllerNode: NodeDefinition = {
    id: "State/Controller/TrailController",
    icon: DoubleIconGen(IconDeviceGamepad2, IconVideo),
    description: "Store a number of previous value",

    dataInputs: [//
        Port.vector2("target"),
        Port.bool("reset", false),
        Port.CacheId()],
    dataOutputs: [Port["array-vector2"]("trail")],
    tags: ["State"],
    settings: [
        SettingGenerator.number("count", 10, { constrains: [Constraints.Integer(), Constraints.GreaterThan(1)] }),
        frameCacheSetting(),
    ],
    ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), ["target"], [], [], ["trail"]),
    getData(portId, node, context) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (useFrameCache(context, node, () => {
            return processAndUpdateCache<any[]>(context, node, getDefaultValue, (current) => {
                const target = context.getInputValue(node, "target", node.dataInputs.target.type);
                const count = node.settings.count;
                var n = [target, ...current]
                return n.length > count ? n.slice(0, count) : n;
            })




            function getDefaultValue() {
                return []
            }
        }))

    },
};

