import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent, SettingProps } from "./SettingsComponents";

export const NumberSetting: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  return (
    <Fieldset
      label={def.id}
      value={value}
      onChange={onChange}
      input={NumberInput}
      constrains={def.constrains}></Fieldset>
  );
};
NumberSetting.getSize = function (value, def): number {
  return 34;
};
