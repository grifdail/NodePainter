import { NumberSettingDefinition } from "../../Types/SettingDefinition";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";

export const NumberSetting: SettingComponent<NumberSettingDefinition> = {
    UI: function ({ onChange, value, def }: SettingProps<NumberSettingDefinition>) {
        return (
            <Fieldset
                label={def.label || def.id}
                value={value}
                onChange={onChange}
                input={NumberInput}
                constrains={def.constrains}></Fieldset>
        );
    },
    getSize: function (value, def): number {
        return 34;
    }
};
