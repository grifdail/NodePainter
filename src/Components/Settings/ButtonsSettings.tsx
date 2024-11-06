import { SettingComponent, SettingProps } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Icon } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";

export const ButtonsSettings: SettingComponent = function ({ onChange, value, def, node }: SettingProps) {
  var buttons = def.buttons as Array<{ label: string; icon: Icon; onClick: (node: NodeData) => void }>;

  return (
    <ButtonGroup>
      {buttons.map((btn) => (
        <Button icon={btn.icon} label={btn.label} onClick={() => useTree.getState().dangerouselyUpdateNode(node.id, btn.onClick)} />
      ))}
    </ButtonGroup>
  );
};
ButtonsSettings.getSize = function (value, def): number {
  return 60;
};
