import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { SettingDefinition } from "../../Data/NodeDefinition";

type SettingComponent = ({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) => any;

export const SettingComponents: { [key: string]: SettingComponent } = {
  dropdown: DropdownSetting,
};

function DropdownSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  return (
    <Menu portal menuButton={<MenuButton>{value}</MenuButton>}>
      <MenuRadioGroup value={value} onRadioChange={(e) => onChange(e.value)}>
        {def.options.map((option: string) => (
          <MenuItem type="radio" value={option}>
            {option};
          </MenuItem>
        ))}
      </MenuRadioGroup>
    </Menu>
  );
}
