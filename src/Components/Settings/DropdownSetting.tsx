import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { DropdownSettingDefinition } from "../../Types/SettingDefinition";

export const DropdownSetting: SettingComponent<DropdownSettingDefinition> = {
    UI: function DropdownSetting({ onChange, value, def }: SettingProps<DropdownSettingDefinition>) {
        return (
            <Fieldset
                input={DropdownInput}
                passtrough={{ options: def.options }}
                value={value}
                onChange={onChange}
                label={def.label || def.id}
            />
        );
    },
    getSize: function (value, def): number {
        return 32;
    }
};
