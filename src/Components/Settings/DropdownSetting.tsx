import { SettingComponent, SettingProps } from "./SettingsComponents";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";

export const DropdownSetting: SettingComponent = function DropdownSetting({ onChange, value, def }: SettingProps) {
  return (
    <Fieldset
      input={DropdownInput}
      passtrough={{ options: def.options }}
      value={value}
      onChange={onChange}
      label={def.id}
    />
  );
};
DropdownSetting.getSize = function (value, def): number {
  return 32;
};
