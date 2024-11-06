import { SettingComponent, SettingProps } from "./SettingsComponents";
import { NumberInput } from "../Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";

export const NumberSetting: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  return <Fieldset label={def.id} value={value} onChange={onChange} input={NumberInput}></Fieldset>;
};
NumberSetting.getSize = function (value, def): number {
  return 34;
};
