import { SettingComponent } from "./SettingsComponents";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { TextInput } from "./TextInput";
import { FieldSet } from "./NumberSetting";

export const StringSetting: SettingComponent = function NumberSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return (
    <FieldSet>
      <label>{def.id}</label>
      <TextInput value={value} onChange={onChange} />
    </FieldSet>
  );
};
StringSetting.getSize = function (value, def): number {
  return 64;
};
