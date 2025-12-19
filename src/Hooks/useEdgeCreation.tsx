import { useCallback } from "react";
import { NodeData } from "../Types/NodeData";
import { PortRole } from "../Types/PortRole";
import { PortType } from "../Types/PortType";
import { canConvertCode } from "../Utils/graph/execution/convertTypeValue";
import { PortSelection, usePortSelection } from "./usePortSelection";
import { useTree } from "./useTree";

export function useEdgeCreation() {
    const [getNode, addEdge, removeDataConnection] = useTree((state) => [state.getNode, state.addEdge, state.removeDataConnection]);
    const createEdge = useCallback(
        function createEdge(left: PortSelection, right: PortSelection) {
            var leftType = getNode(left.node).dataOutputs[left.port]?.type;

            var rightType = getNode(right.node).dataInputs[right.port].type;

            if (canConvertCode(leftType, rightType)) {
                addEdge(left.node, left.port, right.node, right.port);
            }
        },
        [getNode, addEdge]
    );

    const onClickPort = useCallback(
        function (node: string, port: string, location: PortRole, type: PortType) {
            const portSelection = usePortSelection.getState();
            var right: PortSelection = { node, port, location, type };
            if (!portSelection.hasSelection && location === "input" && getNode(node).dataInputs[port].hasConnection) {
                removeDataConnection(node, port);
                return;
            }
            if (portSelection.hasSelection) {
                var left = portSelection;
                if (left.node === right.node && left.port === right.port) {
                    portSelection.reset();
                    return;
                }
                if (left.location === "input" && right.location === "output") {
                    createEdge(right, left);
                } else if (right.location === "input" && left.location === "output") {
                    createEdge(left, right);
                }

                portSelection.reset();
            } else {
                portSelection.select(node, port, location, type);
            }
        },
        [getNode, removeDataConnection, createEdge]
    );

    const onClickNode = useCallback(
        function (node: NodeData) {
            const portSelection = usePortSelection.getState();
            if (portSelection.hasSelection) {
                var selected = portSelection;
                if (selected.node === node.id) {
                    portSelection.reset();
                    return;
                }

                var selectedNodeType = useTree.getState().getNodeTypeDefinition(node);

                if (selected.location === "input") {
                    const goodTypes = selectedNodeType.dataOutputs.filter((port) => port.type === selected.type);
                    if (goodTypes.length === 1) {
                        const port = goodTypes[0];
                        onClickPort(node.id, port.id, "output", port.type);
                        return;
                    }
                }
                if (selected.location === "output") {
                    const goodTypes = selectedNodeType.dataInputs.filter((port) => port.type === selected.type);
                    if (goodTypes.length === 1) {
                        const port = goodTypes[0];
                        onClickPort(node.id, port.id, "input", port.type);
                        return;
                    }
                }
            }
        },
        [onClickPort]
    );

    return { onClickPort, onClickNode };
}
