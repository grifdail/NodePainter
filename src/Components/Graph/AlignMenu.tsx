import { SubMenu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import { IconAlignBoxBottomCenter, IconAlignBoxCenterMiddle, IconAlignBoxCenterStretch, IconAlignBoxLeftStretch, IconAlignBoxRightStretch, IconAlignBoxTopCenter, IconAlignCenter, IconAlignLeft, IconAlignRight } from "@tabler/icons-react";
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
    </SubMenu>
  );
}
