import { BoolSettingDefinition } from "../../Types/SettingDefinition";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Fieldset } from "../StyledComponents/Fieldset";
import { SettingComponent, SettingProps } from "./SettingsComponents";

export const BoolSetting: SettingComponent<BoolSettingDefinition> = function ({ onChange, value, def }: SettingProps<BoolSettingDefinition>) {
  return (
    <Fieldset
      label={def.id}
      value={value}
      onChange={onChange}
      input={BoolInput}></Fieldset>
  );
};
BoolSetting.getSize = function (value, def): number {
  return 48;
};
