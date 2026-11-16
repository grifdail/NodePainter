import { Vector2, Vector3 } from "../../Types/vectorDataType";
import { eulerToTQuat, toQuaternion } from "../math/quaternionUtils";

export type CameraControllerState = {
    position: Vector3;
    euler: Vector2;
};

export function cameraControllerStateToPort(state: CameraControllerState, portId: string) {
    if (portId === "position") {
        return state.position
    } else {
        return toQuaternion(eulerToTQuat([state.euler[1], state.euler[0], 0], "YXZ"))
    }
} 