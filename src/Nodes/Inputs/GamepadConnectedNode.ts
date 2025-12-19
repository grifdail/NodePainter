import { IconDeviceGamepad2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { getGamepads } from "../../Utils/graph/execution/getGamepads";



export const GamepadConnectedNode: NodeDefinition = {
    id: "Input/GamepadConnected",
    description: "Return wether a gamepad is connected",
    icon: IconDeviceGamepad2,
    tags: ["Input"],
    dataInputs: [
        Port.number("gamepad", 0, "If set to something other than one, will only listen to a specific gamepad"),
    ],
    dataOutputs: [Port.bool("connected")],
    settings: [
    ],
    getData: (portId, node, context) => {
        const gamepads = getGamepads(context)
        if (!gamepads) {
            return false;
        }

        var gamepadTarget = Math.floor(context.getInputValueNumber(node, "gamepad"));
        return gamepadTarget === 0 ? gamepads.length >= 1 : gamepads.length >= gamepadTarget
    },
};
