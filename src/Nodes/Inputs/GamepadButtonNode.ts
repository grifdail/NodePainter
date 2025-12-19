import { IconDeviceGamepad2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { getGamepads } from "../../Utils/graph/execution/getGamepads";


type GamepadMapping = {
    'action_1': number,
    'action_2': number,
    'action_3': number,
    'action_4': number,
    'dpad_down': number,
    'dpad_up': number,
    'dpad_left': number,
    'dpad_right': number,
    'start': number,
    'select': number,
    'special': number,
    'media': number,
    'shoulder_left': number,
    'shoulder_right': number,
    'stick_left': number,
    'stick_right': number
}
const MAPPING: Record<string, GamepadMapping> = {
    'standard': {
        'action_1': 0,
        'action_2': 1,
        'action_3': 3,
        'action_4': 2,
        'dpad_down': 13,
        'dpad_up': 12,
        'dpad_left': 14,
        'dpad_right': 15,
        'start': 9,
        'select': 8,
        'special': 16,
        'media': 17,
        'shoulder_left': 4,
        'shoulder_right': 5,
        'stick_left': 10,
        'stick_right': 11
    },
    '045e-0b13-Xbox Wireless Controller': {
        'action_1': 0,
        'action_2': 1,
        'action_3': 2,
        'action_4': 3,
        'dpad_down': 13,
        'dpad_up': 12,
        'dpad_left': 14,
        'dpad_right': 15,
        'start': 9,
        'select': 8,
        'special': 16,
        'media': 17,
        'shoulder_left': 4,
        'shoulder_right': 5,
        'stick_left': 10,
        'stick_right': 11
    }
}

export const GamepadButtonNode: NodeDefinition = {
    id: "Input/GamepadButton",
    label: "Gamepad Button Pressed",
    description: "Whether a specific button on a gamepad is pressed",
    icon: IconDeviceGamepad2,
    tags: ["Input"],
    dataInputs: [Port.number("gamepad", 0, "If set to something other than one, will only listen to a specific gamepad")],
    dataOutputs: [Port.bool("out")],
    settings: [
        {
            id: "key",
            type: "dropdown",
            defaultValue: Object.keys(Object.values(MAPPING)[0])[0],
            options: Object.keys(Object.values(MAPPING)[0]),
        },
    ],
    getData: (portId, node, context) => {
        var key = node.settings.key as string;

        const gamepads = getGamepads(context)
        if (!gamepads) {
            return false;
        }

        var gamepadTarget = Math.floor(context.getInputValueNumber(node, "gamepad"));
        if (gamepadTarget <= 0) {
            return gamepads.some(evalButton)
        } else {
            if (gamepadTarget < gamepads.length) {
                return evalButton(gamepads[gamepadTarget]);
            } else {
                return false;
            }
        }

        function evalButton(gamepad: Gamepad) {
            var mapping = MAPPING[gamepad.id] || MAPPING["standard"]
            return gamepad.buttons[mapping[key as keyof GamepadMapping]]?.pressed || false;
        }
    },
};


