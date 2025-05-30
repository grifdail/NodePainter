import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Button } from "../Generics/Button";
import { useTree } from "../../Hooks/useTree";
import { ButtonSettingDefinition } from "../../Types/SettingDefinition";

export const ButtonsSettings: SettingComponent<ButtonSettingDefinition> = function ({ onChange, value, def, node }: SettingProps<ButtonSettingDefinition>) {
  return (
    <ButtonGroup>
      {def.buttons.map((btn, i) => (
        <Button
          icon={btn.icon}
          key={i}
          label={btn.label}
          onClick={() => useTree.getState().dangerouselyUpdateNode(node.id, btn.onClick)}
        />
      ))}
    </ButtonGroup>
  );
};
ButtonsSettings.getSize = function (value, def): number {
  return 60;
};
