import React from "react";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { usePortSelection } from "../../Hooks/usePortSelection";
import styled from "styled-components";
import { PortType } from "../../Types/PortType";

const StyledPath = styled.path`
  fill: color-mix(in srgb, var(--color-property), transparent 90%);
  stroke: color-mix(in srgb, var(--color-property), transparent 50%);
  stroke-width: 1px;
  border-radius: 10px 0 0 10px;
`;

export function OutputPortView({ x, y, id, label, type, hideLabel, onClick, nodeId }: { x: number; y: number; nodeId: string; hideLabel?: boolean; id: string; label?: string; type: PortType; onClick: () => void }) {
  var portDescription = PortTypeDefinitions[type];
  var Icon = portDescription.icon;
  var portSelection = usePortSelection();
  var isSelected = portSelection.hasSelection && portSelection.node === nodeId && portSelection.port === id && portSelection.location === "output";

  return (
    <StyledPortGroup
      transform={`translate(${x}, ${y})`}
      width="200"
      height="30"
      className={`${type} ${isSelected ? "selected" : ""} `}>
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
        <circle
          cx={0}
          cy={15}
          r={15}
          onClick={onClick}></circle>
        <Icon
          x="-12"
          y="3"
          scale={10}
          onClick={onClick}></Icon>
      </g>
    </StyledPortGroup>
  );
}
