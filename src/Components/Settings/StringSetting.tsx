import { SettingComponent } from "./SettingsComponents";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { TextInput } from "../Inputs/TextInput";
import { Fieldset } from "../StyledComponents/Fieldset";

export const StringSetting: SettingComponent = function NumberSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return <Fieldset label={def.id} input={TextInput} value={value} onChange={onChange}></Fieldset>;
};
StringSetting.getSize = function (value, def): number {
  return 34;
};
