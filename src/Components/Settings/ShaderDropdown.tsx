import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { SettingDefinition } from "../../Data/NodeDefinition";
import { SettingComponent } from "./SettingsComponents";
import styled from "styled-components";
import { ShaderData, useTree } from "../../Hooks/useTree";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  & > button {
    display: block;
  }
`;

export const ShaderDropdownSetting: SettingComponent = function ShaderDropdownSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  var shaders = useTree((state) => state.shaders);
  return (
    <StyledDiv>
      <label>{def.id}</label>
      <Menu portal overflow="auto" menuButton={<MenuButton>{value}</MenuButton>}>
        <MenuRadioGroup value={value} onRadioChange={(e) => onChange(e.value)}>
          {shaders.map((option: ShaderData) => (
            <MenuItem type="radio" value={option} key={option.id}>
              {option.id}
            </MenuItem>
          ))}
        </MenuRadioGroup>
      </Menu>
    </StyledDiv>
  );
};
ShaderDropdownSetting.getSize = function (value, def): number {
  return 32;
};
