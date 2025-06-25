import React from "react";
import { PortConnection } from "../../Types/PortConnection";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { PortForeignObject } from "../StyledComponents/PortForeignObject";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { PortRole } from "../../Types/PortRole";
import { Fieldset } from "../StyledComponents/Fieldset";
import { NODE_WIDTH, PORT_HEIGHT } from "./NodeVisualConst";
import styled from "styled-components";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";

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
  var portDescription = PortTypeDefinitions[portData.type];
  var Icon = portDescription.icon;
  var PortSettings = portDescription.inlineInput;

  var portSelection = usePortSelection();
  var isSelected = portSelection.hasSelection && portSelection.node === nodeId && portSelection.port === portData.id && portSelection.location === "input";
  return (
    <StyledPortGroup
      transform={`translate(0, ${y})`}
      width={NODE_WIDTH}
      height="30"
      className={`${portData.type} ${isSelected ? "selected" : ""} `}>
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
        data-tooltip-id="tooltip"
        data-tooltip-content={portData.label || portData.id}
        transform={`translate(0, ${PORT_HEIGHT * 0.5})`}>
        <circle
          cx={0}
          cy={0}
          r={15}
          onClick={onClick}></circle>
        <Icon
          x="-12"
          y="-12"
          scale={10}
          onClick={onClick}></Icon>
      </g>
    </StyledPortGroup>
  );
}
