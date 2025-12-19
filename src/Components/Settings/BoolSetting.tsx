import { BoolSettingDefinition } from "../../Types/SettingDefinition";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";

export const BoolSetting: SettingComponent<BoolSettingDefinition> = {
    UI: function ({ onChange, value, def }: SettingProps<BoolSettingDefinition>) {
        return (
            <Fieldset
                label={def.label || def.id}
                value={value}
                onChange={onChange}
                input={BoolInput}></Fieldset>
        );
    },
    getSize: (value, def) => {
        return 48;
    }
};
