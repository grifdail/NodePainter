import { SettingComponent } from "./SettingsComponents";
import { NumberInput } from "./NumberInput";
import styled from "styled-components";
import { SettingDefinition } from "../../Data/NodeDefinition";

const FieldSet = styled.fieldset`
  background: none;
  border: none;
`;

export const NumberSetting: SettingComponent = function NumberSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return (
    <FieldSet>
      <label>{def.id}</label>
      <NumberInput value={value} onChange={onChange} />
    </FieldSet>
  );
};
NumberSetting.getSize = function (value, def): number {
  return 64;
};
