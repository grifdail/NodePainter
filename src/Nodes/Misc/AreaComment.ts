import { IconMessage } from "@tabler/icons-react";
import { GetNodeHeight } from "../../Components/Graph/GetNodeHeight";
import { NODE_HEADER_HEIGHT, NODE_WIDTH } from "../../Components/Graph/NodeVisualConst";
import { useSelection } from "../../Hooks/useSelection";
import { BoundingBox } from "../../Types/BoundingBox";
import { GraphArea } from "../../Types/GraphArea";
import { NodeData } from "../../Types/NodeData";
import { ContextMenuData, NodeDefinition } from "../../Types/NodeDefinition";
import { TreeStore } from "../../Types/TreeStore";
import { getNodesInBoundingBox } from "../../Utils/graph/modification/getNodesInBoundingBox";
import { buildBoundingBox } from "../../Utils/ui/buildBoundingBox";

export const AreaComment: NodeDefinition = {
  id: "AreaComment",
  featureLevel: 10,
  description: "Leave a comment associated with a specific area of your graph.",
  icon: IconMessage,
  tags: ["Misc"],
  dataInputs: [],
  dataOutputs: [],
  settings: [{ id: "grapharea", type: "graph-area" }],
  getData(portId, node, context) {},
  contextMenu(node) {
    var options: ContextMenuData = {
      ["Select nodes in the area"]: (node: NodeData, tree: TreeStore) => {
        var area = node.settings.grapharea as GraphArea;
        var areaBoundingBox = new BoundingBox(area.y + node.positionY, area.x + node.positionX + NODE_WIDTH * 0.5 + area.width, area.y + node.positionY + area.height, area.x + node.positionX + NODE_WIDTH * 0.5);
        var nodes = getNodesInBoundingBox(areaBoundingBox);
        useSelection.getState().setSelection(nodes);
      },
    };
    var selection = useSelection.getState().nodes;
    if (selection.length >= 1) {
      options["Build Around Selection"] = (node: NodeData, tree: TreeStore) => {
        var boundingBox = buildBoundingBox([...selection], tree);
        var extended = boundingBox.bb.grow(50, 50, 50, 50);
        var self = new BoundingBox(node.positionY, node.positionX + NODE_WIDTH, node.positionY + GetNodeHeight(node, tree.getNodeTypeDefinition(node)), node.positionX);
        var final = extended.extend(self);
        console.log(node);
        console.log({ x: final.left - node.positionX, width: final.width(), y: final.top - node.positionY, height: final.height(), color: [0, 0, 1, 1], set: true });
        node.settings.grapharea = { x: final.left - node.positionX - NODE_WIDTH * 0.5, width: final.width(), y: final.top - node.positionY - NODE_HEADER_HEIGHT * 0.5, height: final.height(), color: node.settings.grapharea.color, set: true };
      };
    }
    return options;
  },
};
