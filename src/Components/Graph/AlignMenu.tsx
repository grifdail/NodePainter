import { SubMenu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import { IconAlignBoxBottomCenter, IconAlignBoxCenterMiddle, IconAlignBoxCenterStretch, IconAlignBoxLeftStretch, IconAlignBoxRightStretch, IconAlignBoxTopCenter, IconAlignCenter, IconAlignLeft, IconAlignLeft2, IconAlignRight } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { BoundingBox } from "../../Types/BoundingBox";
import { NODE_FOOTER_HEIGHT, NODE_WIDTH } from "./NodeVisualConst";
import { GetNodeHeight } from "./GraphNodeUI";

export function AlignMenu({ nodes }: { nodes: string[] }) {
  var align = useTree((state) => state.align);
  const alignator = (cb: (boundingBox: BoundingBox, nodes: { node: NodeData; boundingBox: BoundingBox }[]) => void) => {
    return () => align(nodes, cb);
  };
  return (
    <SubMenu
      label="Align"
      disabled={nodes.length <= 0}>
      <MenuItem onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionX = box.left)))}>
        <IconAlignLeft /> Align Left
      </MenuItem>
      <MenuItem onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionX = box.right - NODE_WIDTH)))}>
        <IconAlignRight /> Align Right
      </MenuItem>
      <MenuItem onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionX = box.center()[0] - NODE_WIDTH / 0.5)))}>
        <IconAlignCenter /> Align Center
      </MenuItem>
      <MenuItem
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
      <MenuItem onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionY = box.top)))}>
        <IconAlignLeft style={{ transform: "rotate(90deg)" }} /> Align Top
      </MenuItem>
      <MenuItem onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionY = box.bottom - node.boundingBox.height())))}>
        <IconAlignRight style={{ transform: "rotate(90deg)" }} /> Align Bottom
      </MenuItem>
      <MenuItem onClick={alignator((box, nodes) => nodes.forEach((node) => (node.node.positionY = box.center()[1] - node.boundingBox.height() / 0.5)))}>
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
