import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { updateAndReadFromCache } from "../../Utils/graph/execution/blackboardCache";

export const ToggleSwitchNode: NodeDefinition = {
  id: "ToggleSwitch",
  label: "Toggle Switch",
  icon: IconCircuitSwitchOpen,
  description: "Toggle between true and false when its inputs are true",

  dataInputs: [Port.bool("on"), Port.bool("off"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["State"],
  settings: [],
  getData(portId, node, context) {
    const on = context.getInputValueBoolean(node, "on");
    const off = context.getInputValueBoolean(node, "off");
    const previous = updateAndReadFromCache(context, node, (oldValue) => {
      if (off || oldValue === undefined) {
        oldValue = false;
      }
      if (on) {
        oldValue = true;
      }
      return oldValue;
    });

    return previous;
  },
};

export const ToggleFlipFlopNode: NodeDefinition = {
  id: "ToggleFlipFlopSwitch",
  label: "Toggle Flip-Flop",
  icon: IconCircuitSwitchOpen,
  description: "Toggle between true and false everytime it's input is true",

  dataInputs: [Port.bool("flip"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["State"],
  settings: [],
  getData(portId, node, context) {
    const flip = context.getInputValueBoolean(node, "flip");
    const previous = updateAndReadFromCache(context, node, (oldValue) => {
      if (oldValue === undefined) {
        oldValue = false;
      }
      if (flip) {
        oldValue = !oldValue;
      }
      return oldValue;
    });

    return previous;
  },
};
