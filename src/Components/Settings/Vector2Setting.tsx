import { NumberSettingDefinition, Vector2SettingDefinition } from "../../Types/SettingDefinition";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { VectorInput } from "../Generics/Inputs/VectorInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";

export const Vector2Setting: SettingComponent<Vector2SettingDefinition> = {
    UI: function ({ onChange, value, def }: SettingProps<Vector2SettingDefinition>) {
        return (
            <Fieldset
                label={def.label || def.id}
                value={value}
                onChange={onChange}
                input={VectorInput}
                constrains={def.constrains}></Fieldset>
        );
    },
    getSize: function (value, def): number {
        return 34;
    }
};
