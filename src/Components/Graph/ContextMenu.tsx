import { ControlledMenu, FocusableItem, MenuDivider, MenuItem, MenuState, SubMenu } from "@szhsin/react-menu";
import { useCallback, useMemo, useState } from "react";
import { useTree } from "../../Hooks/useTree";
import { useViewbox } from "../../Hooks/useViewbox";
import { resetCamera } from "../../Utils/resetCamera";
import { IconArrowsHorizontal, IconArrowsVertical, IconFocusCentered, IconPlus } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { EDirection } from "../../Types/EDirection";
import { useShallow } from "zustand/react/shallow";

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

export function ContextMenu({ onContextMenu, anchorPoint, state, onClose, filter, setFilter }: ContextMenuProps) {
  const nodesLastUsedDates = usePlayerPref((state) => state.nodesLastUsedDates);
  const mostSorting = useMemo(() => (a: NodeDefinition, b: NodeDefinition) => (nodesLastUsedDates[b.id] || 0) - (nodesLastUsedDates[a.id] || 0), [nodesLastUsedDates]);
  const isShader = useTree((state) => state.getCustomNodeEditingType() === "shader");
  const searchTerm = useMemo(() => filter.toLowerCase(), [filter]);
  const treeNodeLibrary = useTree(useShallow((state) => state.getNodeLibrary()));
  const nodeLibrary = useMemo(
    () =>
      Object.values(treeNodeLibrary).filter((item) => {
        if (item.hideInLibrary) {
          return false;
        }
        return isShader ? item.getShaderCode !== undefined : item.getData !== undefined || item.execute !== undefined || item.executeAs != null;
      }),
    [treeNodeLibrary, isShader]
  );

  const getClickPositionWorld = useCallback((): [number, number] => {
    var view = useViewbox.getState();
    return [view.x + anchorPoint.x * view.scale, view.y + anchorPoint.y * view.scale];
  }, [anchorPoint.x, anchorPoint.y]);

  const onClick = useCallback(
    (node: NodeDefinition) => {
      useTree.getState().addNode(node.id, ...getClickPositionWorld());
      usePlayerPref.getState().markNodeAsUsed(node.id);
      onClose();
    },
    [onClose, getClickPositionWorld]
  );
  const categories = useMemo(() => {
    return nodeLibrary.reduce((old, value) => {
      value.tags.forEach((tag) => {
        if (old[tag] === undefined) {
          old[tag] = [value];
        } else {
          old[tag].push(value);
        }
      });
      return old;
    }, {} as { [key: string]: NodeDefinition[] });
  }, [nodeLibrary]);

  const nodesSelected = useMemo(() => {
    if (searchTerm === "") {
      return [];
    } else {
      const filtered = nodeLibrary.filter((node) => node.id.toLowerCase().includes(searchTerm) || node.label?.toLowerCase().includes(searchTerm)) as any;
      return filtered.toSorted(mostSorting).slice(0, 5) as NodeDefinition[];
    }
  }, [nodeLibrary, searchTerm, mostSorting]);

  return (
    <ControlledMenu anchorPoint={anchorPoint} state={state} direction="right" onClose={onClose} overflow="auto">
      <FocusableItem>{({ ref }) => <input ref={ref} type="text" autoFocus placeholder="Type to filter" value={filter} onChange={(e) => setFilter(e.target.value)} />}</FocusableItem>
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
