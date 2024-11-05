import { ControlledMenu, MenuDivider, MenuItem, MenuState } from "@szhsin/react-menu";
import { useCallback, useMemo, useState } from "react";
import { useTree } from "../../Hooks/useTree";
import { useViewbox } from "../../Hooks/useViewbox";
import { resetCamera } from "../../Utils/resetCamera";
import { IconArrowsHorizontal, IconArrowsVertical, IconFocusCentered, IconPlus } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { EDirection } from "../../Types/EDirection";
import { useShallow } from "zustand/react/shallow";
import { useColorScheme } from "@uiw/react-use-colorscheme";
import { useRouter } from "../../Hooks/useRouter";
import { Routes } from "../../Types/Routes";

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
  const favNodes = usePlayerPref((state) => state.favNodes);
  const mostRecentSorting = useMemo(() => (a: NodeDefinition, b: NodeDefinition) => (nodesLastUsedDates[b.id] || 0) - (nodesLastUsedDates[a.id] || 0), [nodesLastUsedDates]);
  const isShader = useTree((state) => state.getCustomNodeEditingType() === "shader");
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

  const favoritedNode = useMemo(() => {
    return (nodeLibrary.filter((node) => favNodes.includes(node.id)) as any).toSorted(mostRecentSorting).slice(0, 5) as NodeDefinition[];
  }, [nodeLibrary, mostRecentSorting, favNodes]);

  var theme = useColorScheme();

  return (
    <ControlledMenu theming={theme} anchorPoint={anchorPoint} state={state} direction="right" onClose={onClose} overflow="auto">
      {favoritedNode.map((item) => (
        <NodeMenuItem onClick={onClick} node={item} key={item.id} />
      ))}
      {favoritedNode.length > 0 && <MenuDivider></MenuDivider>}
      <MenuItem onClick={() => useRouter.getState().open(Routes.NodeCreation)}>
        <IconPlus /> Add a new Node
      </MenuItem>
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
