import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingComponents } from "./SettingsComponents";

type SettingGeneratorType = { [TDefinition in SettingDefinition as TDefinition["type"]]: (TDefinition extends { defaultValue: any } ? (id: string, defaultValue: TDefinition["defaultValue"], extra?: Omit<TDefinition, "id" | "type" | "defaultValue">) => TDefinition : (id: string, extra?: Omit<TDefinition, "id" | "type" | "defaultValue">) => TDefinition) }

export const SettingGenerator: SettingGeneratorType = Object.entries(SettingComponents).reduce((old, [key, component]) => {
    return {
        ...old, [key]: (id: string, defaultValue?: any, extra?: Omit<SettingDefinition, "id" | "type" | "defaultValue">) => {

            extra = SettingComponents[key as SettingDefinition["type"]]?.generate?.() || {};
            return {
                ...extra,
                id,
                type: key,
                defaultValue
            };
        }
    };
}, {}) as SettingGeneratorType;
