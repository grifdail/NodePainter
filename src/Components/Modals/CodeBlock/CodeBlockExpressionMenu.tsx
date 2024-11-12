import { Menu, MenuItem } from "@szhsin/react-menu";
import { IconMenu2 } from "@tabler/icons-react";
import { CodeBlockExpressionTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { PortType } from "../../../Types/PortType";
import { InvisibleButton } from "../../Generics/Button";
import { buildMenuItems } from "./buildMenuItems";

export const CodeBlockExpressionMenu = ({ type, onChange }: { type: PortType | "any"; onChange: (expressionType: string) => void }) => {
  return <Menu menuButton={<InvisibleButton icon={IconMenu2} />}>{buildMenuItems(CodeBlockExpressionTypes, onChange, type === "any" ? undefined : (gen) => gen.canEvaluateTo(type))}</Menu>;
};
