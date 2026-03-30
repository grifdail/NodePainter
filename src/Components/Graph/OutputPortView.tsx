import styled from "styled-components";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { useColorScheme } from "@uiw/react-use-colorscheme";
import { useCallback } from "react";
import { useTree } from "../../Hooks/useTree";
import { ContextMenuProps, useContextMenu } from "../../Hooks/useContextMenu";

const StyledPath = styled.path`
  fill: color-mix(in srgb, var(--color-property), transparent 90%);
  stroke: color-mix(in srgb, var(--color-property), transparent 50%);
  stroke-width: 1px;
  border-radius: 10px 0 0 10px;
`;

export function OutputPortView({ x, y, id, label, type, hideLabel, onClick, nodeId }: { x: number; y: number; nodeId: string; hideLabel?: boolean; id: string; label?: string; type: PortType; onClick: () => void }) {
    const portDescription = PortTypeDefinitions[type];
    const Icon = portDescription.icon;
    const portSelection = usePortSelection();
    const contextMenuProps = useContextMenu();
    const hasSelection = portSelection.hasSelection;
    const isSelected = hasSelection && portSelection.node === nodeId && portSelection.port === id && portSelection.location === "output";
    const canBeSelected = !isSelected && hasSelection && portSelection.location === "input" && (type === portSelection.type || PortTypeDefinitions[portSelection.type].convert[type]);

    return (
        <StyledPortGroup
            onContextMenu={contextMenuProps.onContextMenu}
            transform={`translate(${x}, ${y})`}
            width="200"
            height="30"
            className={`${type} ${isSelected ? "selected" : ""} ${hasSelection && !canBeSelected ? "hidden" : ""} `}>
            <StyledPath d="M 0 0 L -80 0 A 16 16 0 0 0 -96 16 A 16 16 0 0 0 -80 32 L 0 32" />
            <text
                onClick={onClick}
                x="-25"
                y="15"
                textAnchor="end"
                visibility={hideLabel ? "hidden" : "visible"}>
                {label}
            </text>
            <g
                data-tooltip-id="tooltip"
                data-tooltip-content={label}>
                <circle cx={0}
                    cy={15}
                    r={15}
                    onClick={onClick} />
                <Icon x="-12"
                    y="3"
                    scale={10}
                    onClick={onClick} />
            </g>

            {contextMenuProps.state === "open" && <PortContextMenu {...contextMenuProps} port={id} nodeId={nodeId} />}
        </StyledPortGroup>
    );
}

function PortContextMenu({ anchorPoint, state, onClose, nodeId, port }: ContextMenuProps & { port: string, nodeId: string }) {
    const theme = useColorScheme();
    const onConvertToNode = useCallback(() => {
        useTree.getState().convertPortToNode(nodeId, port, "output");
    }, [nodeId, port]);
    return (
        <ControlledMenu theming={theme} anchorPoint={anchorPoint} state={state} direction="right" onClose={onClose} overflow="auto" portal>
            <MenuItem onClick={onConvertToNode}>Convert to Value Node</MenuItem>
        </ControlledMenu>
    );
}