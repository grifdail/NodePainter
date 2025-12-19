import { HiddenSettingDefinition, SettingDefinition } from "../../Types/SettingDefinition";
import { SettingProps } from "../../Types/SettingProps";

export const EmptySetting = {
    UI: ({ onChange, value, def }: SettingProps<HiddenSettingDefinition>) => {
        return null;
    },
    getSize: (value: any, def: SettingDefinition) => 0
};
