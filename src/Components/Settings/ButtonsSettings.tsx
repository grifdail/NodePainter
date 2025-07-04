import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Button } from "../Generics/Button";
import { useTree } from "../../Hooks/useTree";
import { ButtonSettingDefinition } from "../../Types/SettingDefinition";

export const ButtonsSettings: SettingComponent<ButtonSettingDefinition> = function ({ onChange, value, def, node }: SettingProps<ButtonSettingDefinition>) {
  if (def.button.hide && def.button.hide(node)) {
    return <></>;
  }

  return (
    <ButtonGroup>
      <Button
        icon={def.button.icon}
        label={def.button.label}
        onClick={() => useTree.getState().dangerouselyUpdateNode(node.id, def.button.onClick)}
      />
    </ButtonGroup>
  );
};
ButtonsSettings.getSize = function (value, def, node): number {
  if (def.button.hide && node && def.button.hide(node)) {
    return 0;
  }
  return 60;
};
