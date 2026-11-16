import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";

export const ToggleFlipFlopNode: NodeDefinition = {
    id: "State/ToggleFlipFlopSwitch",
    label: "Toggle Flip-Flop",
    icon: IconCircuitSwitchOpen,
    description: "Toggle between true and false everytime it's input is true",

    dataInputs: [Port.bool("flip"), Port.Tick(), Port.Reset(), Port.CacheId()],
    dataOutputs: [Port.bool("out")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {
        return readFromCacheWithVersion<boolean>(context, node, (previous) => {
            const flip = context.getInputValueBoolean(node, "flip");


            if (previous === undefined) {
                previous = false;
            }
            if (flip) {
                return !previous
            }
            return previous;
        })
    },
};
