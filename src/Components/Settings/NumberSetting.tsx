import { SettingComponent } from "./SettingsComponents";
import { NumberInput } from "../Inputs/NumberInput";
import styled from "styled-components";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { Fieldset } from "../StyledComponents/Fieldset";

export const NumberSetting: SettingComponent = function NumberSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return <Fieldset label={def.id} value={value} onChange={onChange} input={NumberInput}></Fieldset>;
};
NumberSetting.getSize = function (value, def): number {
  return 34;
};
