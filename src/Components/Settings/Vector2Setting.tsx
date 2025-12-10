import { NumberSettingDefinition, Vector2SettingDefinition } from "../../Types/SettingDefinition";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { VectorInput } from "../Generics/Inputs/VectorInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";

export const Vector2Setting: SettingComponent<Vector2SettingDefinition> = function ({ onChange, value, def }: SettingProps<Vector2SettingDefinition>) {
    return (
        <Fieldset
            label={def.label || def.id}
            value={value}
            onChange={onChange}
            input={VectorInput}
            constrains={def.constrains}></Fieldset>
    );
};
Vector2Setting.getSize = function (value, def): number {
    return 34;
};
