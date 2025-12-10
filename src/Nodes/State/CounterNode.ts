import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { useCache } from "../../Utils/graph/execution/blackboardCache";

export const CounterNode: NodeDefinition = {
  id: "State/Counter",
  label: "Counter",
  icon: DoubleIconGen(IconDeviceFloppy, IconPlus),
  description: "Output a number that change by step for every call when the boolean input are true",

  dataInputs: [Port.number("step", 1), Port.bool("increase"), Port.bool("decrease"), Port.bool("reset"), Port.number("min", 0), Port.number("max", 100), Port.CacheId()],
  dataOutputs: [Port.number("count")],
  tags: ["State"],
  settings: [],
  getData(portId, node, context) {
    const step = context.getInputValueNumber(node, "step");
    const increase = context.getInputValueBoolean(node, "increase");
    const decrease = context.getInputValueBoolean(node, "decrease");
    const reset = context.getInputValueBoolean(node, "reset");
    const min = context.getInputValueNumber(node, "min");
    const max = context.getInputValueNumber(node, "max");

    let [value, setValue] = useCache(context, node);
    if (value === undefined || reset) {
      value = 0;
    }
    if (increase) {
      value = value + step;
    }
    if (decrease) {
      value = value - step;
    }

    value = Math.max(Math.min(value, max), min);
    setValue(value);
    return value;
  },
};
