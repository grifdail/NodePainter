import { NumberSettingDefinition } from "../../Types/SettingDefinition";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";

export const NumberSetting: SettingComponent<NumberSettingDefinition> = function ({ onChange, value, def }: SettingProps<NumberSettingDefinition>) {
  return (
    <Fieldset
      label={def.label || def.id}
      value={value}
      onChange={onChange}
      input={NumberInput}
      constrains={def.constrains}></Fieldset>
  );
};
NumberSetting.getSize = function (value, def): number {
  return 34;
};
