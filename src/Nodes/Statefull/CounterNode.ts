import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { DoubleIcon } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { updateAndReadFromCache } from "../../Utils/useCache";

export const Counter: NodeDefinition = {
  id: "Counter",
  label: "Counter",
  icon: DoubleIcon(IconDeviceFloppy, IconPlus),
  description: "Output a number that change by step for every call when the boolean input are true",

  dataInputs: [Port.number("step", 1), Port.bool("increase"), Port.bool("decrease"), Port.bool("reset"), Port.number("min", 0), Port.number("max", 100), Port.CacheId()],
  dataOutputs: [Port.number("count")],
  tags: ["Statefull"],
  settings: [],
  getData(portId, node, context) {
    const step = context.getInputValueNumber(node, "step");
    const increase = context.getInputValueBoolean(node, "increase");
    const decrease = context.getInputValueBoolean(node, "decrease");
    const reset = context.getInputValueBoolean(node, "reset");
    const min = context.getInputValueNumber(node, "min");
    const max = context.getInputValueNumber(node, "max");
    const previous = updateAndReadFromCache(context, node, (value: number | undefined) => {
      if (value === undefined) {
        value = 0;
      }
      if (reset) {
        value = 0;
      }
      if (increase) {
        value = value + step;
      }
      if (decrease) {
        value = value - step;
      }

      return Math.max(Math.min(value, max), min);
    });
    return previous;
  },
};
