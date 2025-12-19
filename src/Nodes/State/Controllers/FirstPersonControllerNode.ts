import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { clamp } from "three/src/math/MathUtils";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { useCache, useFrameCache } from "../../../Utils/graph/execution/blackboardCache";
import { eulerToTQuat, toQuaternion } from "../../../Utils/math/quaternionUtils";
import { trueMod } from "../../../Utils/math/trueMod";
import { vector2Perpendicular, vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";

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
        Port.bool("reset", false),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position"), Port.quaternion("rotation")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {
        return useFrameCache(context, node, () => {
            const cameraInput = context.getInputValueVector2(node, "cameraInput");
            const movementInput = context.getInputValueVector2(node, "movementInput");
            const cameraSensibility = context.getInputValueVector2(node, "cameraSensibility");
            const movementSpeed = context.getInputValueNumber(node, "movementSpeed");

            let [previous, setValue] = useCache(context, node);
            const reset = context.getInputValueBoolean(node, "reset");
            if (reset || previous === undefined) {
                previous = getDefaultTransform();
            }

            //Update rotation
            var newEuler = [
                trueMod(previous.euler[0] - cameraInput[0] * cameraSensibility[0] * context.deltaTime, Math.PI * 2),
                clamp(previous.euler[1] - cameraInput[1] * cameraSensibility[1] * context.deltaTime, -Math.PI / 2, Math.PI / 2),
            ]
            var newQuat = eulerToTQuat([newEuler[1], newEuler[0], 0], "YXZ")

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
            var nextValue = {
                position: newPosition,
                euler: newEuler
            }
            setValue(nextValue);
            return {
                rotation: toQuaternion(newQuat),
                position: newPosition
            } as Record<string, any>

            function getDefaultTransform() {
                return {
                    position: context.getInputValueVector3(node, "startPosition"),
                    euler: context.getInputValueVector2(node, "startRotation")
                }
            }
        })[portId]

    },
};

