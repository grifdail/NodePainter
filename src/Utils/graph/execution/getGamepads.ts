import { ExecutionContext } from "./createExecutionContext";




export function getGamepads(context: ExecutionContext): (Gamepad[] | null) {
    if (!navigator.getGamepads) {
        return null;
    }
    if (!context.frameBlackboard["GAMEPAD_STATE"]) {
        context.frameBlackboard["GAMEPAD_STATE"] = navigator.getGamepads().filter(item => item !== null && item.connected) as Gamepad[];
    }
    return context.frameBlackboard["GAMEPAD_STATE"] as Gamepad[];
}

