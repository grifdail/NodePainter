import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { DropdownSettingDefinition } from "../../Types/SettingDefinition";

export const DropdownSetting: SettingComponent<DropdownSettingDefinition> = function DropdownSetting({ onChange, value, def }: SettingProps<DropdownSettingDefinition>) {
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
