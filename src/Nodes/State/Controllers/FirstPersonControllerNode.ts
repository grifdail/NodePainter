import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { clamp } from "three/src/math/MathUtils";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { trueMod } from "../../../Utils/math/trueMod";
import { vector2Perpendicular, vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";
import { CameraControllerState, cameraControllerStateToPort } from "../../../Utils/misc/CameraControllerState";

export const FirstPersonControllerNode: NodeDefinition = {
    id: "State/Controller/FirstPersonController",
    label: "First Person Controller",
    icon: DoubleIconGen(IconDeviceGamepad2, IconVideo),
    description: "Simulate a first person camera controller",

    dataInputs: [//
        Port.vector2("cameraInput"),
        Port.vector2("movementInput"),
        Port.vector3("startPosition", [0, 0, 0]),
        Port.vector2("startRotation", [0, 0], "Euler angle around vertical and horizontal axis"),
        Port.vector2("cameraSensibility", [1, 1]),
        Port.number("movementSpeed", 1),
        Port.Tick(),
        Port.bool("reset", false),
        Port.CacheId()
    ],
    dataOutputs: [Port.vector3("position"), Port.quaternion("rotation")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {

        const result = readFromCacheWithVersion<CameraControllerState>(context, node, (previous) => {
            const cameraInput = context.getInputValueVector2(node, "cameraInput");
            const movementInput = context.getInputValueVector2(node, "movementInput");
            const cameraSensibility = context.getInputValueVector2(node, "cameraSensibility");
            const movementSpeed = context.getInputValueNumber(node, "movementSpeed");

            if (previous === undefined) {
                previous = {
                    position: context.getInputValueVector3(node, "startPosition"),
                    euler: context.getInputValueVector2(node, "startRotation")
                };
            }

            //Update rotation
            var newEuler: Vector2 = [
                trueMod(previous.euler[0] - cameraInput[0] * cameraSensibility[0] * context.deltaTime, Math.PI * 2),
                clamp(previous.euler[1] - cameraInput[1] * cameraSensibility[1] * context.deltaTime, -Math.PI / 2, Math.PI / 2),
            ]


            //Update movement
            var forward = createVector2(Math.sin(newEuler[0]), Math.cos(newEuler[0]));
            var right = vector2Perpendicular(forward)
            var sum =
                vectorAddition(
                    vectorScale(forward, movementInput[1]),
                    vectorScale(right, movementInput[0])
                )

            var newPosition = vectorAddition(
                previous.position,
                vectorScale(
                    [sum[0], 0, sum[1]],
                    -context.deltaTime * movementSpeed
                )
            )

            return {
                position: newPosition,
                euler: newEuler
            }
        })

        return cameraControllerStateToPort(result, portId)
    },
};

