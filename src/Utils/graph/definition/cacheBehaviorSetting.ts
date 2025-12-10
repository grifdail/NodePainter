import { DropdownSettingDefinition } from "../../../Types/SettingDefinition";


export const CACHE_BEHAVIOR = {
    RememberForever: "Remember forever",
    Destroy: "Destroy",
    NoCache: "No Cache"
}
export const CACHE_BEHAVIOR_ID = "cacheBehavior"

export function cacheBehaviorSetting(): DropdownSettingDefinition {
    return {
        type: "dropdown",
        id: CACHE_BEHAVIOR_ID,
        label: "Cache Behavior",
        tooltip: "With 'Remember forever' the data is saved per Cache Id until the end of the sketch. This is most usefull to reuse the same data across frame in a loop. With 'Destroy' the data will be recomputed everytime 'CacheId' change, even if it's a id that's already been used before.",
        options: [CACHE_BEHAVIOR.RememberForever, CACHE_BEHAVIOR.Destroy],
        defaultValue: CACHE_BEHAVIOR.RememberForever
    }
}

export function cacheBehaviorSettingWithNoCache(): DropdownSettingDefinition {
    return {
        type: "dropdown",
        id: CACHE_BEHAVIOR_ID,
        label: "Cache Behavior",
        tooltip: `With 'Remember forever' the data is saved per Cache Id until the end of the sketch. This is most usefull to reuse the same data across frame in a loop. 
        With 'Destroy' the data will be recomputed everytime 'CacheId' change, even if it's a id that's already been used before.
        With 'No Cache', cacheId will be ignored completly and data will be recomputed everytime
        `,
        options: [CACHE_BEHAVIOR.RememberForever, CACHE_BEHAVIOR.Destroy, CACHE_BEHAVIOR.NoCache],
        defaultValue: CACHE_BEHAVIOR.RememberForever
    }
}
