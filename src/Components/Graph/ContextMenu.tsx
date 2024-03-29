import { ControlledMenu, FocusableItem, MenuDivider, MenuItem, MenuState, SubMenu } from "@szhsin/react-menu";
import { useState } from "react";
import { useTree } from "../../Hooks/useTree";
import { useViewbox } from "../../Hooks/useViewbox";
import { resetCamera } from "../../Utils/resetCamera";
import { IconArrowsHorizontal, IconArrowsVertical, IconFocusCentered, IconPlus } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { EDirection } from "../../Types/EDirection";

export type ContextMenuProps = {
  onContextMenu: (e: any) => void;
  anchorPoint: { x: number; y: number };
  state: MenuState;
  onClose: () => void;
  filter: string;
  setFilter: (val: string) => void;
};

export function NodeMenuItem({ node, onClick }: { node: NodeDefinition; onClick: (node: NodeDefinition) => void }) {
  const Icon = node.icon;
  return (
    <MenuItem onClick={() => onClick(node)}>
      {Icon != null ? <Icon></Icon> : null}
      {node.label || node.id}
    </MenuItem>
  );
}

export function ContextMenu(props: ContextMenuProps) {
  const nodesLastUsedDates = usePlayerPref((state) => state.nodesLastUsedDates);
  const mostSorting = (a: NodeDefinition, b: NodeDefinition) => (nodesLastUsedDates[b.id] || 0) - (nodesLastUsedDates[a.id] || 0);
  const isShader = useTree((state) => state.getCustomNodeEditingType() === "shader");
  const searchTerm = props.filter.toLowerCase();
  const nodeLibrary = Object.values(useTree((state) => state.getNodeLibrary())).filter((item) => {
    if (item.hideInLibrary) {
      return false;
    }
    return isShader ? item.getShaderCode !== undefined : item.getData !== undefined || item.execute !== undefined || item.executeAs != null;
  });

  const getClickPositionWorld = (): [number, number] => {
    var view = useViewbox.getState();
    return [view.x + props.anchorPoint.x * view.scale, view.y + props.anchorPoint.y * view.scale];
  };
  const onClick = (node: NodeDefinition) => {
    useTree.getState().addNode(node.id, ...getClickPositionWorld());
    usePlayerPref.getState().markNodeAsUsed(node.id);
    props.onClose();
  };
  const categories = nodeLibrary.reduce((old, value) => {
    value.tags.forEach((tag) => {
      if (old[tag] === undefined) {
        old[tag] = [value];
      } else {
        old[tag].push(value);
      }
    });
    return old;
  }, {} as { [key: string]: NodeDefinition[] });
  const nodesSelected = searchTerm === "" ? [] : ((nodeLibrary.filter((node) => node.id.toLowerCase().includes(searchTerm) || node.label?.toLowerCase().includes(searchTerm)) as any).toSorted(mostSorting).slice(0, 5) as NodeDefinition[]);
  return (
    <ControlledMenu anchorPoint={props.anchorPoint} state={props.state} direction="right" onClose={props.onClose} overflow="auto">
      <FocusableItem>{({ ref }) => <input ref={ref} type="text" autoFocus placeholder="Type to filter" value={props.filter} onChange={(e) => props.setFilter(e.target.value)} />}</FocusableItem>
      {nodesSelected.map((item) => (
        <NodeMenuItem onClick={onClick} node={item} key={item.id} />
      ))}
      <MenuDivider></MenuDivider>
      <SubMenu
        overflow="auto"
        label={
          <>
            <IconPlus />
            Add Node
          </>
        }>
        {Object.entries(categories).map(([category, content]) => (
          <SubMenu label={category} overflow="auto" key={category}>
            {content.map((item) => (
              <NodeMenuItem onClick={onClick} node={item} key={item.id} />
            ))}
          </SubMenu>
        ))}
      </SubMenu>
      <MenuDivider></MenuDivider>
      <MenuItem onClick={() => resetCamera()}>
        <IconFocusCentered /> Reset Camera
      </MenuItem>
      <MenuItem onClick={() => useTree.getState().freeSpace(EDirection.Horizontal, 500, ...getClickPositionWorld())}>
        <IconArrowsHorizontal /> Make room horizontaly
      </MenuItem>
      <MenuItem onClick={() => useTree.getState().freeSpace(EDirection.Vertical, 250, ...getClickPositionWorld())}>
        <IconArrowsVertical /> Make room verticaly
      </MenuItem>
    </ControlledMenu>
  );
}
export function useContextMenu(): ContextMenuProps {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState("");

  const onContextMenu = (e: any) => {
    if (typeof document.hasFocus === "function" && !document.hasFocus()) return;

    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setFilter("");
    setOpen(true);
  };
  return { onContextMenu, anchorPoint, state: isOpen ? "open" : "closed", onClose: () => setOpen(false), filter, setFilter };
}
