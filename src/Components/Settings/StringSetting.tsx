import { SettingComponent, SettingProps } from "./SettingsComponents";
import { Fieldset } from "../StyledComponents/Fieldset";
import { TextInput } from "../Generics/Inputs/TextInput";

export const StringSetting: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  return (
    <Fieldset
      label={def.id}
      input={TextInput}
      value={value}
      onChange={onChange}></Fieldset>
  );
};
StringSetting.getSize = function (value, def): number {
  return 34;
};
