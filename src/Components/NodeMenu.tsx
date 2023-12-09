import { Menu, MenuButton, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { IconMenu } from "@tabler/icons-react";
import { NodeData, useTree } from "../Hooks/useTree";
import { NodeDefinition } from "../Data/NodeDefinition";

export function NodeMenu({ node, def }: { node: NodeData; def: NodeDefinition }) {
  const duplicateNode = useTree((state) => state.duplicateNode);
  const deleteNode = useTree((state) => state.deleteNode);
  const resetNode = useTree((state) => state.resetNode);
  const executeCallback = useTree((state) => state.executeCallback);
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
        <MenuItem key="delete" onClick={() => deleteNode(node.id)}>
          Delete
        </MenuItem>
        <MenuItem key="duplicate" onClick={() => duplicateNode(node.id)}>
          Duplicate
        </MenuItem>
        <MenuItem key="reset" onClick={() => resetNode(node.id)}>
          Reset
        </MenuItem>
        {def.contextMenu && [
          <MenuDivider key="divider" />,
          ...Object.entries(def.contextMenu).map(([key, fn]) => {
            return (
              <MenuItem key={key} onClick={() => executeCallback(node.id, fn)}>
                {key}
              </MenuItem>
            );
          }),
        ]}
      </Menu>
    </foreignObject>
  );
}
