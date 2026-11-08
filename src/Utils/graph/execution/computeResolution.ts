import { ResolutionSettingData } from "../../../Types/ResolutionSettingData";
import { ExecutionContext } from "./createExecutionContext";

export function computeResolution(context: ExecutionContext, setting: ResolutionSettingData) {
    if (setting.mode === "static") {
        return { width: Math.floor(setting.width), height: Math.floor(setting.height) };
    }
    var { width, height } = context.p5;
    if (setting.mode === "original") {
        return { width, height }
    } else {
        return { width: Math.floor(width * setting.scale), height: Math.floor(height * setting.scale) }
    }
}