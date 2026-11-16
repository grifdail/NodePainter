import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const CounterNode: NodeDefinition = {
    id: "State/Counter",
    label: "Counter",
    icon: DoubleIconGen(IconDeviceFloppy, IconPlus),
    description: "Output a number that change by 'step' for every call when the boolean input are true",

    dataInputs: [
        Port.number("step", 1),
        Port.bool("increase"),
        Port.bool("decrease"),
        Port.number("min", 0),
        Port.number("max", 100),
        Port.number("default", 0),
        Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.number("count")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {
        return readFromCacheWithVersion<number>(context, node, (previous) => {
            const step = context.getInputValueNumber(node, "step");
            const increase = context.getInputValueBoolean(node, "increase");
            const decrease = context.getInputValueBoolean(node, "decrease");
            const min = context.getInputValueNumber(node, "min");
            const max = context.getInputValueNumber(node, "max");
            if (previous === undefined) {
                previous = context.getInputValueNumber(node, "default");
            }

            let value = previous;
            if (increase) {
                value += step;
            }
            if (decrease) {
                value -= step;
            }

            return Math.max(Math.min(value, max), min);

        });
    },
};
