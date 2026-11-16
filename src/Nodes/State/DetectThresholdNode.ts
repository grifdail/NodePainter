import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const DetectThresholdNode: NodeDefinition = {
    id: "State/DetectThreshold",
    label: "Detect Threshold",
    icon: IconCircuitSwitchOpen,
    description: "Output true only on when the input number cross the target",

    dataInputs: [Port.number("in"), Port.number("target"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    settings: [
        {
            id: "direction",
            type: "dropdown",
            defaultValue: "both",
            options: ["both", "ascending", "descending"],
        },
    ],
    getData(portId, node, context) {
        return readFromCacheWithVersion<[boolean, number]>(context, node, (previous) => {

            const current = context.getInputValueNumber(node, "in");
            const target = context.getInputValueNumber(node, "target");
            if (previous === undefined) {
                previous = [false, current];
            }
            // eslint-disable-next-line react-hooks/rules-of-hooks

            const signPrevious = Math.sign(previous[1] - target);
            const signCurrent = Math.sign(current - target);
            if (signCurrent !== signPrevious) {
                if (node.settings.direction === "both") {
                    return [true, current];
                }
                if (signPrevious === -1 && node.settings.direction === "ascending") {
                    return [true, current];
                }
                if (signPrevious === 1 && node.settings.direction === "descending") {
                    return [true, current];
                }
            }
            return [false, current];
        })[0]
    },
};
