import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { Quaternion, Vector3 as TVector3 } from "three";
import { clamp } from "three/src/math/MathUtils";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector3, Vector2 } from "../../../Types/vectorDataType";
import { processAndUpdateCache, useFrameCache } from "../../../Utils/graph/execution/blackboardCache";
import { eulerToTQuat, toQuaternion } from "../../../Utils/math/quaternionUtils";
import { trueMod } from "../../../Utils/math/trueMod";
import { vectorAddition } from "../../../Utils/math/vectorUtils";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const OrbitCameraControllerNode: NodeDefinition = {
    id: "State/Controller/OrbitCameraController",
    icon: DoubleIconGen(IconDeviceGamepad2, IconVideo),
    description: "Simulate the movement of a camera orbiting around a point",

    dataInputs: [//
        Port.vector2("cameraInput"),
        Port.vector3("target", createVector3(0, 0, 0)),
        Port.number("radius", 10),
        Port.vector2("startRotation", [0, 0], "Euler angle around vertical and horizontal axis"),
        Port.vector2("cameraSensibility", [1, 1]),
        Port.number("minAltitude", 0, [Constraints.Clamp(-Math.PI * 0.5, -Math.PI * 0.5)]),
        Port.number("maxAltitude", Math.PI / 2, [Constraints.Clamp(-Math.PI * 0.5, -Math.PI * 0.5)]),
        Port.bool("reset", false),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position"), Port.quaternion("rotation")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {
        return useFrameCache(context, node, () => {
            const reset = context.getInputValueBoolean(node, "reset");
            const cameraInput = context.getInputValueVector2(node, "cameraInput");
            const target = context.getInputValueVector3(node, "target");
            const cameraSensibility = context.getInputValueVector2(node, "cameraSensibility");
            const radius = context.getInputValueNumber(node, "radius");
            const minAltitude = context.getInputValueNumber(node, "minAltitude");
            const maxAltitude = context.getInputValueNumber(node, "maxAltitude");

            return processAndUpdateCache(context, node, getDefaultTransform, ({ euler }) => {
                //Update rotation
                var newEuler = [
                    trueMod(euler[0] - cameraInput[0] * cameraSensibility[0] * context.deltaTime, Math.PI * 2),
                    clamp(euler[1] - cameraInput[1] * cameraSensibility[1] * context.deltaTime, -maxAltitude, -minAltitude),
                ]
                var newQuat = eulerToTQuat([newEuler[1], newEuler[0], 0], "YXZ")

                //Update movement
                return {
                    euler: newEuler as Vector2,
                    rotation: toQuaternion(newQuat),
                    position: getPosition(newQuat)
                }
            }, undefined, reset)

            function getPosition(newQuat: Quaternion) {
                return vectorAddition(target, new TVector3(0, 0, radius).applyQuaternion(newQuat).toArray())
            }

            function getDefaultTransform() {
                const startRotation = context.getInputValueVector2(node, "startRotation");
                var newQuat = eulerToTQuat([startRotation[1], startRotation[0], 0], "YXZ")
                return {
                    euler: startRotation,
                    rotation: [0, 0, 0, 1],
                    position: getPosition(newQuat),
                }
            }
        })[portId as "position" | "rotation"]

    }


};
