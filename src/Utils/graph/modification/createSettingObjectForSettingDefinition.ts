import { SettingComponents } from "../../../Components/Settings/SettingsComponents";
import { SettingDefinition } from "../../../Types/SettingDefinition";
import { identity } from "../../misc/identity";


export function createSettingObjectForSettingDefinition(def: SettingDefinition[]): { [key: string]: any } {
    return def.reduce((old: any, setting: SettingDefinition) => {
        var base = "defaultValue" in setting ? structuredClone(setting.defaultValue) : undefined;
        const initializer = SettingComponents[setting.type].initializeValue || identity
        old[setting.id] = initializer(base, setting as any);
        return old;
    }, {});
}
