import { IconMessage } from "@tabler/icons-react";
import { NODE_WIDTH } from "../../Components/Graph/NodeVisualConst";
import { useSelection } from "../../Hooks/useSelection";
import { BoundingBox } from "../../Types/BoundingBox";
import { GraphArea } from "../../Types/GraphArea";
import { NodeData } from "../../Types/NodeData";
import { ContextMenuData, NodeDefinition } from "../../Types/NodeDefinition";
import { TreeStore } from "../../Types/TreeStore";
import { getNodesInBoundingBox } from "../../Utils/graph/modification/getNodesInBoundingBox";
import { buildBoundingBoxAroundTreeNodes } from "../../Utils/ui/buildBoundingBox";

export const AreaCommentNode: NodeDefinition = {
  id: "Misc/AreaComment",
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
        selectNodeInAreas(area, node);
      },
    };
    var selection = useSelection.getState().nodes;
    if (selection.length >= 1) {
      options["Build Around Selection"] = (node: NodeData, tree: TreeStore) => {
        var boundingBox = buildBoundingBoxAroundTreeNodes([...selection], tree);
        var extended = boundingBox.bb.grow(50, 50, 50, 50);

        node.settings.grapharea = { x: extended.left, width: extended.width(), y: extended.top, height: extended.height(), color: node.settings.grapharea.color, name: node.settings.grapharea.name, relative: false };
      };
    }
    return options;
  },
};
export function selectNodeInAreas(area: GraphArea, node: NodeData, includeSelf?: boolean) {
  var areaBoundingBox = !area.relative ? new BoundingBox(area.y, area.x + area.width, area.y + area.height, area.x) : new BoundingBox(area.y + node.positionY, area.x + node.positionX + NODE_WIDTH * 0.5 + area.width, area.y + node.positionY + area.height, area.x + node.positionX + NODE_WIDTH * 0.5);
  var nodes = getNodesInBoundingBox(areaBoundingBox);
  useSelection.getState().setSelection(includeSelf ? [...nodes, node.id] : nodes);
}
