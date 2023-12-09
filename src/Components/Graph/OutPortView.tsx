import React from "react";
import { PortType } from "../../Data/NodeDefinition";
import { PortColor } from "../StyledComponents/PortColor";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";

export function OutPortView({ x, y, id, type, hideLabel, onClick }: { x: number; y: number; hideLabel?: boolean; id: string; type: PortType; onClick: () => void }) {
  var portDescription = PortColor[type];
  var Icon = portDescription.icon;
  return (
    <StyledPortGroup transform={`translate(${x}, ${y})`} width="200" height="30" className={type}>
      <rect x="-98" y="0" width="98" height="30" fill="rgba(0,0,0,0.1)" visibility={hideLabel ? "hidden" : "visible"}></rect>
      <text x="-25" y="15" textAnchor="end" visibility={hideLabel ? "hidden" : "visible"}>
        {id}
      </text>
      <circle cx={0} cy={15} r={15} onClick={onClick}></circle>
      <Icon x="-12" y="3" scale={10} onClick={onClick}></Icon>
    </StyledPortGroup>
  );
}
