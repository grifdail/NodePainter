import { IconDeviceGamepad2, IconVideo } from "@tabler/icons-react";
import { Quaternion, Vector3 as TVector3 } from "three";
import { clamp } from "three/src/math/MathUtils";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector3, Vector2, Vector3, Vector4 } from "../../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { eulerToTQuat, toQuaternion } from "../../../Utils/math/quaternionUtils";
import { trueMod } from "../../../Utils/math/trueMod";
import { vectorAddition } from "../../../Utils/math/vectorUtils";
import { Constraints } from "../../../Utils/ui/applyConstraints";

type OrbitState = {
    euler: Vector2,
    rotation: Vector4,
    position: Vector3,
}

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
        Port.Tick(),
        Port.Reset(),
        Port.CacheId()],
    dataOutputs: [Port.vector3("position"), Port.quaternion("rotation")],
    tags: ["State"],
    settings: [],
    getData(portId, node, context) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = readFromCacheWithVersion<OrbitState>(context, node, (previous) => {
            const target = context.getInputValueVector3(node, "target");
            const cameraInput = context.getInputValueVector2(node, "cameraInput");
            const cameraSensibility = context.getInputValueVector2(node, "cameraSensibility");
            const radius = context.getInputValueNumber(node, "radius");
            const minAltitude = context.getInputValueNumber(node, "minAltitude");
            const maxAltitude = context.getInputValueNumber(node, "maxAltitude");

            if (!previous) {
                const startRotation = context.getInputValueVector2(node, "startRotation");
                const newQuat = eulerToTQuat([startRotation[1], startRotation[0], 0], "YXZ")
                previous = {
                    euler: startRotation,
                    rotation: [0, 0, 0, 1],
                    position: getPosition(newQuat),
                }
            }
            const euler = previous.euler;



            //Update rotation
            const newEuler: Vector2 = [
                trueMod(euler[0] - cameraInput[0] * cameraSensibility[0] * context.deltaTime, Math.PI * 2),
                clamp(euler[1] - cameraInput[1] * cameraSensibility[1] * context.deltaTime, -maxAltitude, -minAltitude),
            ];
            const newQuat = eulerToTQuat([newEuler[1], newEuler[0], 0], "YXZ");

            //Update movement
            return {
                euler: newEuler,
                rotation: toQuaternion(newQuat),
                position: getPosition(newQuat)
            }

            function getPosition(newQuat: Quaternion) {
                return vectorAddition(target, new TVector3(0, 0, radius).applyQuaternion(newQuat).toArray())
            }
        })
        return result[portId as "position" | "rotation"]
    }

};
