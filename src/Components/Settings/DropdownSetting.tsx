import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingComponent } from "./SettingsComponents";
import styled from "styled-components";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Inputs/DropdownInput";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  & > button {
    display: block;
  }
`;

export const DropdownSetting: SettingComponent = function DropdownSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return <Fieldset input={DropdownInput} passtrough={{ options: def.options }} value={value} onChange={value} label={def.id} />;
};
DropdownSetting.getSize = function (value, def): number {
  return 32;
};
