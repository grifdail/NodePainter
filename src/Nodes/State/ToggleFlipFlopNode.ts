import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { useCache } from "../../Utils/graph/execution/blackboardCache";

export const ToggleFlipFlopNode: NodeDefinition = {
  id: "State/ToggleFlipFlopSwitch",
  label: "Toggle Flip-Flop",
  icon: IconCircuitSwitchOpen,
  description: "Toggle between true and false everytime it's input is true",

  dataInputs: [Port.bool("flip"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["State"],
  settings: [],
  getData(portId, node, context) {
    const flip = context.getInputValueBoolean(node, "flip");

    const [previous, setValue] = useCache(context, node);
    if (previous === undefined) {
      setValue(false);
    }
    if (flip) {
      setValue(!previous);
      return !previous
    }


    return !!previous;
  },
};
