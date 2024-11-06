import { SettingComponent, SettingProps } from "./SettingsComponents";
import { TextInput } from "../Inputs/TextInput";
import { Fieldset } from "../StyledComponents/Fieldset";

export const StringSetting: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  return <Fieldset label={def.id} input={TextInput} value={value} onChange={onChange}></Fieldset>;
};
StringSetting.getSize = function (value, def): number {
  return 34;
};
