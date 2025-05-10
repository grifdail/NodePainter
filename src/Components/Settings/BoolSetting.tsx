import { BoolInput } from "../Generics/Inputs/BoolInput";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent, SettingProps } from "./SettingsComponents";

export const BoolSetting: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  return (
    <Fieldset
      label={def.id}
      value={value}
      onChange={onChange}
      input={BoolInput}
      constrains={def.constrains}></Fieldset>
  );
};
BoolSetting.getSize = function (value, def): number {
  return 48;
};
