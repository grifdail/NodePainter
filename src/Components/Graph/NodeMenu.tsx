import { Menu, MenuButton, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { IconMenu2 } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import styled from "styled-components";

var StyledButton = styled(MenuButton)`
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  display: block flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  animation: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.2);
  }
`;

export function NodeMenu({ node, def }: { node: NodeData; def: NodeDefinition }) {
  const duplicateNode = useTree((state) => state.duplicateNode);
  const deleteNode = useTree((state) => state.deleteNode);
  const resetNode = useTree((state) => state.resetNode);
  const executeCallback = useTree((state) => state.executeCallback);
  return (
    <foreignObject x="260" y="10" height="30" width="30" className="context-menu">
      <Menu
        portal
        menuButton={
          <StyledButton>
            <IconMenu2></IconMenu2>
          </StyledButton>
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
