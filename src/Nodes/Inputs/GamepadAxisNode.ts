import { IconDeviceGamepad2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../Types/vectorDataType";
import { getGamepads } from "../../Utils/graph/execution/getGamepads";
import { vectorAddition } from "../../Utils/math/vectorUtils";


type GamepadMapping = {
    'left_stick': [number, number],
    'right_stick': [number, number],
    'triggers': [number, number],
}
const MAPPING: Record<string, GamepadMapping> = {
    'standard': {
        'left_stick': [0, 1],
        'right_stick': [2, 3],
        'triggers': [4, 5],
    },
    '045e-0b13-Xbox Wireless Controller': {
        'left_stick': [0, 1],
        'right_stick': [4, 5],
        'triggers': [6, 7],
    }
}

export const GamepadAxisNode: NodeDefinition = {
    id: "Input/GamepadAxis",
    description: "The value of a gamepad axis",
    icon: IconDeviceGamepad2,
    tags: ["Input"],
    dataInputs: [
        Port.number("gamepad", 0, "If set to something other than one, will only listen to a specific gamepad"),
        Port.number("deadzone", 0.1)
    ],
    dataOutputs: [Port.vector2("out")],
    settings: [
        {
            id: "key",
            type: "dropdown",
            defaultValue: Object.keys(Object.values(MAPPING)[0])[0],
            options: Object.keys(Object.values(MAPPING)[0]),
        },
        {
            type: "bool",
            id: "flipY",
            label: "Flip Y",
            "defaultValue": false
        }
    ],
    getData: (portId, node, context) => {
        var key = node.settings.key as string;
        var flipY = node.settings.flipY as string;
        var deadzone = context.getInputValueNumber(node, "deadzone");

        const gamepads = getGamepads(context)
        if (!gamepads) {
            return [0, 0];
        }

        var gamepadTarget = Math.floor(context.getInputValueNumber(node, "gamepad"));
        if (gamepadTarget <= 0) {
            return gamepads.reduce((old, v) => vectorAddition(old, evalButton(v)), [0, 0])
        } else {
            if (gamepadTarget < gamepads.length) {
                return evalButton(gamepads[gamepadTarget]);
            } else {
                return false;
            }
        }

        function evalButton(gamepad: Gamepad): Vector2 {
            var mapping = MAPPING[gamepad.id] || MAPPING["standard"]
            var mappingStick = mapping[key as keyof GamepadMapping]
            console.log(mapping)
            if (!mappingStick) {
                return [0, 0];
            }
            return radialDeadzone([gamepad.axes[mappingStick[0]] || 0, (gamepad.axes[mappingStick[1]] || 0) * (flipY ? -1 : 1)], deadzone)
        }


    },
};



function radialDeadzone(coord: Vector2, deadzone = 0): Vector2 {
    const angle = Math.atan2(coord[1], coord[0]);
    let magnitude = Math.sqrt(coord[0] * coord[0] + coord[1] * coord[1]);

    if (magnitude <= deadzone) {
        return [0, 0];
    }

    if (magnitude > 1) {
        magnitude = 1;
    }

    return createVector2(
        Math.cos(angle) * normalise(magnitude, deadzone),
        Math.sin(angle) * normalise(magnitude, deadzone)
    );
}

export function normalise(value: number, deadzone: number = 0) {
    if (value === 0) {
        return value;
    }

    let absScalar = Math.abs(value);
    const normalised = (absScalar - deadzone) / (1 - deadzone);

    return value < 0 ? -normalised : normalised;
}