import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { TextInput } from "../Generics/Inputs/TextInput";
import { StringSettingDefinition, TextAreaSettingDefinition } from "../../Types/SettingDefinition";
import { TextAreaInput } from "../Generics/Inputs/TextAreaInput";

export const TextAreaSetting: SettingComponent<TextAreaSettingDefinition> = function ({ onChange, value, def }: SettingProps<TextAreaSettingDefinition>) {
  return (
    <Fieldset
      label={def.id}
      input={TextAreaInput}
      value={value}
      onChange={onChange}
      passtrough={{ constrains: def.constrains }}></Fieldset>
  );
};
TextAreaSetting.getSize = function (value, def): number {
  return 134;
};
