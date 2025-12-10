import { BoolSettingDefinition } from "../../../Types/SettingDefinition";



export const FRAME_CACHE_ID = "cacheBehavior"

export function frameCacheSetting(): BoolSettingDefinition {
    return {
        type: "bool",
        id: FRAME_CACHE_ID,
        label: "Use Frame Cache",
        tooltip: "When this is on, the node will be executed at most once per frame per cacheId. Otherwise if that node is reference by multiple other node, or if multiple outputs are used, they will each trigger a new computation of the node.",
        defaultValue: true
    }
}
