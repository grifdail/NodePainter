import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { clamp } from "three/src/math/MathUtils";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { createOrSelectFromCache, getCacheKey, updateCache } from "../../../Utils/graph/execution/blackboardCache";
import { eulerToTQuat, toQuaternion } from "../../../Utils/math/quaternionUtils";
import { vector2Perpendicular, vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";

export const FirstPersonControllerNode: NodeDefinition = {
    id: "State/Controller/FirstPersonController",
    label: "First Person Controller",
    icon: DoubleIconGen(IconDeviceGamepad2, IconVideo),
    description: "Simulate a first person camera controller",

    dataInputs: [//
        Port.vector2("cameraAxis"),
        Port.vector2("movementAxis"),
        Port.vector3("startPosition", [0, 0, 0]),
        Port.vector("startRotation", [0, 0], "Euler angle around vertical and horizontal axis"),
        Port.vector2("cameraSensibility", [0.0005, 0.0005]),
        Port.number("movementSpeed", 0.005),
        Port.bool("reset", false),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position"), Port.quaternion("rotation")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {
        const cacheKey = getCacheKey(undefined, context, node);
        if (context.frameBlackboard[cacheKey]) {
            return context.frameBlackboard[cacheKey][portId];
        } else {
            let previousValue = createOrSelectFromCache(context, node, getDefaultTransform)
            const cameraAxis = context.getInputValueVector2(node, "cameraAxis");
            const movementAxis = context.getInputValueVector2(node, "movementAxis");
            const cameraSensibility = context.getInputValueVector2(node, "cameraSensibility");
            const movementSpeed = context.getInputValueNumber(node, "movementSpeed");
            const reset = context.getInputValueBoolean(node, "reset");
            if (reset) {
                previousValue = getDefaultTransform();
            }

            //Update rotation
            var newEuler = [
                trueMod(previousValue.euler[0] - cameraAxis[0] * cameraSensibility[0] * context.deltaTime, Math.PI * 2),
                clamp(previousValue.euler[1] - cameraAxis[1] * cameraSensibility[1] * context.deltaTime, -Math.PI / 2, Math.PI / 2),
            ]
            var newQuat = eulerToTQuat([newEuler[1], newEuler[0], 0], "YXZ")

            //Update movement
            var forward = createVector2(Math.sin(newEuler[0]), Math.cos(newEuler[0]));
            var right = vector2Perpendicular(forward)
            var sum =
                vectorAddition(
                    vectorScale(forward, movementAxis[1]),
                    vectorScale(right, movementAxis[0])
                )

            var newPosition = vectorAddition(
                previousValue.position,
                vectorScale(
                    [sum[0], 0, sum[1]],
                    -context.deltaTime * movementSpeed
                )

            )
            var nextValue = {
                position: newPosition,
                euler: newEuler
            }
            updateCache(context, node, nextValue);

            var frameData = {
                rotation: toQuaternion(newQuat),
                position: newPosition
            } as Record<string, any>
            context.frameBlackboard[cacheKey] = frameData
            return frameData[portId];
        }
        function getDefaultTransform() {
            return {
                position: context.getInputValueVector3(node, "startPosition"),
                euler: context.getInputValueVector2(node, "startRotation")
            }
        }

    },
};

const trueMod = (a: number, b: number) => ((a % b) + b) % b
