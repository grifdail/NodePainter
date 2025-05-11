import { SettingComponent, SettingProps } from "./SettingsComponents";
import { Fieldset } from "../StyledComponents/Fieldset";
import { TextInput } from "../Generics/Inputs/TextInput";
import { StringSettingDefinition } from "../../Types/SettingDefinition";

export const StringSetting: SettingComponent<StringSettingDefinition> = function ({ onChange, value, def }: SettingProps<StringSettingDefinition>) {
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
