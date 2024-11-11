import { Menu, MenuItem } from "@szhsin/react-menu";
import { IconMenu2 } from "@tabler/icons-react";
import { CodeBlockExpressionType as CodeBlockExpressionTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { PortType } from "../../../Types/PortType";
import { InvisibleButton } from "../../Generics/Button";

export const CodeBlockExpressionMenu = ({ type, onChange }: { type: PortType; onChange: (v: string) => void }) => {
  var expressions = Object.values(CodeBlockExpressionTypes).filter((gen) => gen.canEvaluateTo(type));
  return (
    <Menu menuButton={<InvisibleButton icon={IconMenu2} />}>
      {expressions.map((expression) => (
        <MenuItem
          key={expression.id}
          onClick={() => onChange(expression.id)}>
          {expression.id}
        </MenuItem>
      ))}
    </Menu>
  );
};
