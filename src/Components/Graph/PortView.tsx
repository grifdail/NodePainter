import React from "react";
import { PortColor } from "../StyledComponents/PortColor";
import { PortConnection } from "../../Types/PortConnection";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { PortForeignObject } from "../StyledComponents/PortForeignObject";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { PortRole } from "../../Types/PortRole";

export function PortView({ y, portData, onClick, onValueChange, nodeId, location }: { y: number; nodeId: string; location: PortRole; portData: PortConnection; onClick: () => void; onValueChange: (newValue: any) => void }) {
  var portDescription = PortColor[portData.type];
  var Icon = portDescription.icon;
  var PortSettings = portDescription.input;

  var portSelection = usePortSelection();
  var isSelected = portSelection.hasSelection && portSelection.node === nodeId && portSelection.port === portData.id && portSelection.location === location;

  return (
    <StyledPortGroup transform={`translate(0, ${y})`} width="200" height="30" className={`${portData.type} ${isSelected ? "selected" : ""} `}>
      <rect x="0" y="0" width="200" height="30" fill="rgba(0,0,0,0.1)"></rect>
      <PortForeignObject height={30} width={175} x={25} y={0}>
        <div>
          <p>{portData.label || portData.id}</p>
          {!portData.hasConnection && PortSettings && <PortSettings onChange={onValueChange} value={portData.ownValue} />}
        </div>
      </PortForeignObject>
      <g data-tooltip-id="tooltip" data-tooltip-content={portData.label || portData.id}>
        <circle cx={0} cy={15} r={15} onClick={onClick}></circle>
        <Icon x="-12" y="3" scale={10} onClick={onClick}></Icon>
      </g>
    </StyledPortGroup>
  );
}
