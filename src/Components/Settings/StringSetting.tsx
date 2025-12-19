import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { TextInput } from "../Generics/Inputs/TextInput";
import { StringSettingDefinition } from "../../Types/SettingDefinition";

export const StringSetting: SettingComponent<StringSettingDefinition> = {
    UI: function ({ onChange, value, def }: SettingProps<StringSettingDefinition>) {
        return (
            <Fieldset
                label={def.label || def.id}
                input={TextInput}
                value={value}
                onChange={onChange}
                passtrough={{ constrains: def.constrains }}></Fieldset>
        );
    },
    getSize: function (value, def): number {
        return 34;
    }
};
