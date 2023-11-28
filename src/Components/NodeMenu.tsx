import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { IconMenu } from "@tabler/icons-react";
import { NodeData, useTree } from "../Hooks/useTree";

export function NodeMenu({ node }: { node: NodeData }) {
  const duplicateNode = useTree((state) => state.duplicateNode);
  const deleteNode = useTree((state) => state.deleteNode);
  const resetNode = useTree((state) => state.resetNode);
  return (
    <foreignObject x="240" y="10" height="45" width="45" className="context-menu">
      <Menu
        portal
        menuButton={
          <MenuButton>
            <IconMenu></IconMenu>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => deleteNode(node.id)}>Delete</MenuItem>
        <MenuItem onClick={() => duplicateNode(node.id)}>Duplicate</MenuItem>
        <MenuItem onClick={() => resetNode(node.id)}>Reset</MenuItem>
      </Menu>
    </foreignObject>
  );
}
