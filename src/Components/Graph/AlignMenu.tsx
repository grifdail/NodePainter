import { SubMenu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import { IconAlignCenter, IconAlignLeft, IconAlignLeft2, IconAlignRight, IconArrowMoveRight, IconArrowsHorizontal, IconArrowsVertical } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { BoundingBox } from "../../Types/BoundingBox";
import { NODE_WIDTH } from "./NodeVisualConst";
import { useSelection } from "../../Hooks/useSelection";
import { EDirection } from "../../Types/EDirection";

export function AlignMenu({ clickWorldPosition }: { clickWorldPosition: [number, number] }) {
  const nodes = useSelection((state) => state.nodes);
  var align = useTree((state) => state.align);
  const alignator = (cb: (boundingBox: BoundingBox, nodes: { node: NodeData; boundingBox: BoundingBox }[]) => void) => {
    return () => align(nodes, cb);
  };
  return (
    <SubMenu
      label={
        <>
          <IconAlignLeft2></IconAlignLeft2> Move Nodes{" "}
        </>
      }
      overflow="auto">
      <MenuItem onClick={() => useTree.getState().freeSpace(EDirection.Horizontal, 500, ...clickWorldPosition)}>
        <IconArrowsHorizontal /> Make room horizontaly
      </MenuItem>
      <MenuItem onClick={() => useTree.getState().freeSpace(EDirection.Vertical, 250, ...clickWorldPosition)}>
        <IconArrowsVertical /> Make room verticaly
      </MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionX = box.left)))}>
        <IconAlignLeft /> Align Left
      </MenuItem>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionX = box.right - NODE_WIDTH)))}>
        <IconAlignRight /> Align Right
      </MenuItem>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionX = box.center()[0] - NODE_WIDTH / 0.5)))}>
        <IconAlignCenter /> Align Center
      </MenuItem>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => {
          const nodeSorted = nodes.sort((a, b) => a.boundingBox.left - b.boundingBox.left);
          const totalWidth = nodeSorted.reduce((old, node) => node.boundingBox.width() + old, 0);
          const totalLeftOverSpace = box.width() - totalWidth;
          const split = totalLeftOverSpace / (nodeSorted.length - 1);
          var tp = box.left;
          nodeSorted.forEach((node) => {
            node.node.positionX = tp;
            tp += split + node.boundingBox.width();
          });
        })}>
        <IconAlignLeft2 style={{ transform: "rotate(90deg)" }} />
        Space evenly horizontaly
      </MenuItem>
      <MenuDivider></MenuDivider>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionY = box.top)))}>
        <IconAlignLeft style={{ transform: "rotate(90deg)" }} /> Align Top
      </MenuItem>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionY = box.bottom - node.boundingBox.height())))}>
        <IconAlignRight style={{ transform: "rotate(90deg)" }} /> Align Bottom
      </MenuItem>
      <MenuItem
        disabled={nodes.length <= 0}
        onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionY = box.center()[1] - node.boundingBox.height() / 0.5)))}>
        <IconAlignCenter style={{ transform: "rotate(90deg)" }} /> Align Middle
      </MenuItem>
      <MenuItem
        onClick={alignator((box, nodes) => {
          const nodeSorted = nodes.sort((a, b) => a.boundingBox.top - b.boundingBox.top);
          const totalHeight = nodeSorted.reduce((old, node) => node.boundingBox.height() + old, 0);
          const totalLeftOverSpace = box.height() - totalHeight;
          const split = totalLeftOverSpace / (nodeSorted.length - 1);
          var tp = box.top;
          nodeSorted.forEach((node) => {
            node.node.positionY = tp;
            tp += split + node.boundingBox.height();
          });
        })}>
        <IconAlignLeft2 />
        Space evenly verticaly
      </MenuItem>
    </SubMenu>
  );
}
