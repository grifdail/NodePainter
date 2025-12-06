import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { Vector3 as TVector3 } from "three";
import { clamp } from "three/src/math/MathUtils";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createOrSelectFromCache, createOrSelectFromFrameCache, updateCache } from "../../../Utils/graph/execution/blackboardCache";
import { eulerToTQuat, toQuaternion } from "../../../Utils/math/quaternionUtils";
import { vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";

export const FreecamControllerNode: NodeDefinition = {
    id: "State/Controller/FreecamController",
    label: "Freecam Controller",
    icon: DoubleIconGen(IconDeviceGamepad2, IconVideo),
    description: "Simulate a free movement camera",

    dataInputs: [//
        Port.vector2("cameraAxis"),
        Port.vector3("movementAxis"),
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
        return createOrSelectFromFrameCache(context, node, () => {
            let previousValue = createOrSelectFromCache(context, node, getDefaultTransform)
            const cameraAxis = context.getInputValueVector2(node, "cameraAxis");
            const movementAxis = context.getInputValueVector3(node, "movementAxis");
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
            var forward = new TVector3(movementAxis[0], movementAxis[1], -movementAxis[2]).applyQuaternion(newQuat)
            var newPosition = vectorAddition(
                previousValue.position,
                vectorScale(
                    forward.toArray(),
                    context.deltaTime * movementSpeed
                )

            )
            var nextValue = {
                position: newPosition,
                euler: newEuler
            }
            updateCache(context, node, nextValue);

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

    }


};

const trueMod = (a: number, b: number) => ((a % b) + b) % b
