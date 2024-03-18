import React from "react";
import { PortRole } from "../../Types/PortRole";
import { PortType } from "../../Types/PortType";
import { PortColor } from "../StyledComponents/PortColor";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { usePortSelection } from "../../Hooks/usePortSelection";

export function OutPortView({ x, y, id, label, type, hideLabel, onClick, nodeId, location }: { x: number; y: number; nodeId: string; location: PortRole; hideLabel?: boolean; id: string; label?: string; type: PortType; onClick: () => void }) {
  var portDescription = PortColor[type];
  var Icon = portDescription.icon;
  var portSelection = usePortSelection();
  var isSelected = portSelection.hasSelection && portSelection.node === nodeId && portSelection.port === id && portSelection.location === location;

  return (
    <StyledPortGroup transform={`translate(${x}, ${y})`} width="200" height="30" className={`${type} ${isSelected ? "selected" : ""} `}>
      <rect x="-98" y="0" width="98" height="30" fill="rgba(0,0,0,0.1)" visibility={hideLabel ? "hidden" : "visible"}></rect>
      <text x="-25" y="15" textAnchor="end" visibility={hideLabel ? "hidden" : "visible"}>
        {label || id}
      </text>
      <circle cx={0} cy={15} r={15} onClick={onClick}></circle>
      <Icon x="-12" y="3" scale={10} onClick={onClick}></Icon>
    </StyledPortGroup>
  );
}
