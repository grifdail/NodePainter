import { PortLocation, PortType } from "../Data/PortType";
import { PortSelection, usePortSelection } from "./usePortSelection";
import { useTree } from "./useTree";

export function useEdgeCreation() {
  const tree = useTree();
  const portSelection = usePortSelection();

  function createDataNode(left: PortSelection, right: PortSelection) {
    var leftType = tree.getNodeTypeDefinition(tree.getNode(left.node)).outputPorts.find((item) => item.id === left.port)?.type;

    var rightType = tree.getNode(right.node).inputs[right.port].type;
    if (leftType === rightType) {
      tree.addEdge(left.node, left.port, right.node, right.port);
    }
  }

  function createExecNode(left: PortSelection, right: PortSelection) {
    // TODO: Validate joins
    tree.addEdge(left.node, left.port, right.node, right.port);
  }

  const onClickPort = function (node: string, port: string, location: PortLocation, type: PortType) {
    var right: PortSelection = { node, port, location, type };
    if (!portSelection.hasSelection && location === PortLocation.InputData && tree.getNode(node).inputs[port].hasConnection) {
      tree.removeDataConnection(node, port);
      return;
    }
    if (!portSelection.hasSelection && location === PortLocation.OutputExec && tree.getNode(node).output[port] !== null) {
      tree.removeOutputConnection(node, port);
      return;
    }
    if (portSelection.hasSelection) {
      var left = portSelection;
      if (left.node === right.node && left.port === right.port) {
        portSelection.reset();
        return;
      }
      if (left.location === PortLocation.InputData && right.location === PortLocation.OutputData) {
        createDataNode(right, left);
      } else if (right.location === PortLocation.InputData && left.location === PortLocation.OutputData) {
        createDataNode(left, right);
      } else if (left.location === PortLocation.InputExec && right.location === PortLocation.OutputExec) {
        createExecNode(right, left);
      } else if (right.location === PortLocation.InputExec && left.location === PortLocation.OutputExec) {
        createExecNode(left, right);
      }

      portSelection.reset();
    } else {
      portSelection.select(node, port, location, type);
    }
  };

  return onClickPort;
}
