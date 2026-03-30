import styled from "styled-components";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { PortConnection } from "../../Types/PortConnection";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { Fieldset } from "../StyledComponents/Fieldset";
import { PortForeignObject } from "../StyledComponents/PortForeignObject";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { NODE_WIDTH, PORT_HEIGHT } from "./NodeVisualConst";
import { useColorScheme } from "@uiw/react-use-colorscheme";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { ContextMenuProps, useContextMenu } from "../../Hooks/useContextMenu";
import { useCallback } from "react";
import { useTree } from "../../Hooks/useTree";

const ImprovedFieldSet = styled(Fieldset)`
  background: color-mix(in srgb, var(--color-property), transparent 90%);
  border: 1px solid color-mix(in srgb, var(--color-property), transparent 50%);
  padding-right: 2px;
  padding-left: 30px;
  border-radius: 0 24px 24px 0;
  margin-right: 15px;
  height: calc(100% - 2px);

  & label {
    width: 80px;
    flex: 0 0 80px;

    cursor: pointer;
  }
`;

export function InputPortView({ y, portData, onClick, onValueChange, nodeId }: { y: number; nodeId: string; portData: PortConnection; onClick: () => void; onValueChange: (newValue: any) => void }) {
    const portDescription = PortTypeDefinitions[portData.type];
    const Icon = portDescription.icon;
    const PortSettings = portDescription.inlineInput;

    const portSelection = usePortSelection();
    const hasSelection = portSelection.hasSelection;
    const isSelected = hasSelection && portSelection.node === nodeId && portSelection.port === portData.id && portSelection.location === "input";

    const canBeSelected = !isSelected && hasSelection && portSelection.location === "output" && (portData.type === portSelection.type || PortTypeDefinitions[portSelection.type].convert[portData.type]);
    const contextMenuProps = useContextMenu();
    return (
        <StyledPortGroup

            transform={`translate(0, ${y})`}
            width={NODE_WIDTH}
            height="30"
            className={`${portData.type} ${isSelected ? "selected" : ""}  ${hasSelection && !canBeSelected ? "hidden" : ""} `}>
            <PortForeignObject
                height={PORT_HEIGHT}
                width={NODE_WIDTH}
                x={0}
                y={0}>
                <ImprovedFieldSet
                    onClickLabel={onClick}
                    label={portData.label || portData.id}
                    input={(!portData.hasConnection && PortSettings) as any}
                    onChange={onValueChange}
                    value={portData.ownValue}
                    tooltip={portData.tooltip}
                    passtrough={{ constrains: portData.constrains }}
                />

            </PortForeignObject>
            <g
                onContextMenu={contextMenuProps.onContextMenu}
                data-tooltip-id="tooltip"
                data-tooltip-content={portData.label || portData.id}
                transform={`translate(0, ${PORT_HEIGHT * 0.5})`}>
                <circle cx={0}
                    cy={0}
                    r={15}
                    onClick={onClick} />
                <Icon x="-12"
                    y="-12"
                    scale={10}
                    onClick={onClick} />
            </g>
            {contextMenuProps.state === "open" && <PortContextMenu {...contextMenuProps} port={portData} nodeId={nodeId} />}
        </StyledPortGroup>
    );
}



function PortContextMenu({ anchorPoint, state, onClose, nodeId, port }: ContextMenuProps & { port: PortConnection, nodeId: string }) {
    const theme = useColorScheme();
    const onConvertToNode = useCallback(() => {
        useTree.getState().convertPortToNode(nodeId, port.id, "input");
    }, [nodeId, port.id]);
    const onResetPort = useCallback(() => {
        useTree.getState().resetPort(nodeId, port.id);
    }, [nodeId, port.id])
    return (
        <ControlledMenu theming={theme} anchorPoint={anchorPoint} state={state} direction="right" onClose={onClose} overflow="auto" portal>
            <MenuItem onClick={onConvertToNode}>Convert to Value Node</MenuItem>
            <MenuItem onClick={onResetPort}>Reset</MenuItem>

        </ControlledMenu>
    );
}


