import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { SettingDefinition } from "../Data/NodeDefinition";
import { SettingComponent } from "./SettingsComponents";

export const DropdownSetting: SettingComponent = function DropdownSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return (
    <Menu portal menuButton={<MenuButton>{value}</MenuButton>}>
      <MenuRadioGroup value={value} onRadioChange={(e) => onChange(e.value)}>
        {def.options.map((option: string) => (
          <MenuItem type="radio" value={option} key={option}>
            {option};
          </MenuItem>
        ))}
      </MenuRadioGroup>
    </Menu>
  );
};
DropdownSetting.getSize = function (value, def): number {
  return 32;
};
