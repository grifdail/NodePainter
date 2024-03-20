import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingComponent } from "./SettingsComponents";
import styled from "styled-components";

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
  return (
    <StyledDiv>
      <label>{def.id}</label>
      <Menu portal overflow="auto" menuButton={<MenuButton>{value}</MenuButton>}>
        <MenuRadioGroup value={value} onRadioChange={(e) => onChange(e.value)}>
          {def.options.map((option: string) => (
            <MenuItem type="radio" value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </MenuRadioGroup>
      </Menu>
    </StyledDiv>
  );
};
DropdownSetting.getSize = function (value, def): number {
  return 32;
};
