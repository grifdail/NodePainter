import { NodeData } from "../Types/NodeData";
import { MainExecuteId } from "../Types/NodeDefinition";
import { PortRole } from "../Types/PortRole";
import { PortType } from "../Types/PortType";
import { canConvertCode } from "../Utils/convertTypeValue";
import { PortSelection, usePortSelection } from "./usePortSelection";
import { useTree } from "./useTree";

export function useEdgeCreation() {
  const tree = useTree();

  function createDataNode(left: PortSelection, right: PortSelection) {
    var leftType = tree.getNode(left.node).dataOutputs[left.port]?.type;

    var rightType = tree.getNode(right.node).dataInputs[right.port].type;

    if (canConvertCode(leftType, rightType)) {
      tree.addEdge(left.node, left.port, right.node, right.port);
    }
  }

  function createExecNode(left: PortSelection, right: PortSelection) {
    // TODO: Validate joins
    tree.addEdge(left.node, left.port, right.node, right.port);
  }

  const onClickPort = function (node: string, port: string, location: PortRole, type: PortType) {
    const portSelection = usePortSelection.getState();
    var right: PortSelection = { node, port, location, type };
    if (!portSelection.hasSelection && location === "inputData" && tree.getNode(node).dataInputs[port].hasConnection) {
      tree.removeDataConnection(node, port);
      return;
    }
    if (!portSelection.hasSelection && location === "outputExecute" && tree.getNode(node).execOutputs[port] !== null) {
      tree.removeOutputConnection(node, port);
      return;
    }
    if (portSelection.hasSelection) {
      var left = portSelection;
      if (left.node === right.node && left.port === right.port) {
        portSelection.reset();
        return;
      }
      if (left.location === "inputData" && right.location === "outputData") {
        createDataNode(right, left);
      } else if (right.location === "inputData" && left.location === "outputData") {
        createDataNode(left, right);
      } else if (left.location === "inputExecute" && right.location === "outputExecute") {
        createExecNode(right, left);
      } else if (right.location === "inputExecute" && left.location === "outputExecute") {
        createExecNode(left, right);
      }

      portSelection.reset();
    } else {
      portSelection.select(node, port, location, type);
    }
  };

  const onClickNode = function (node: NodeData) {
    const portSelection = usePortSelection.getState();
    if (portSelection.hasSelection) {
      var selected = portSelection;
      if (selected.node === node.id) {
        portSelection.reset();
        return;
      }

      var selectedNodeType = useTree.getState().getNodeTypeDefinition(node);
      if (selected.location === "outputExecute") {
        if (selectedNodeType.canBeExecuted) {
          onClickPort(node.id, MainExecuteId, "inputExecute", "execute");
        }
      }
      if (selected.location === "inputExecute") {
        if (selectedNodeType.executeOutputs.length === 1) {
          const port = selectedNodeType.executeOutputs[0];
          onClickPort(node.id, port, "outputExecute", "execute");
        }
      }
      if (selected.location === "inputData") {
        const goodTypes = selectedNodeType.dataOutputs.filter((port) => port.type === selected.type);
        if (goodTypes.length === 1) {
          const port = goodTypes[0];
          onClickPort(node.id, port.id, "outputData", port.type);
          return;
        }
      }
      if (selected.location === "outputData") {
        const goodTypes = selectedNodeType.dataInputs.filter((port) => port.type === selected.type);
        if (goodTypes.length === 1) {
          const port = goodTypes[0];
          onClickPort(node.id, port.id, "inputData", port.type);
          return;
        }
      }
    }
  };

  return { onClickPort, onClickNode };
}
