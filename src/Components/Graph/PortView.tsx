import React from "react";
import { PortColor } from "../StyledComponents/PortColor";
import { PortConnection } from "../../Types/PortConnection";
import { StyledPortGroup } from "../StyledComponents/StyledPortGroup";
import { PortForeignObject } from "../StyledComponents/PortForeignObject";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { PortRole } from "../../Types/PortRole";
import { Fieldset } from "../StyledComponents/Fieldset";
import { PORT_HEIGHT } from "./NodeVisualConst";

export function PortView({ y, portData, onClick, onValueChange, nodeId, location }: { y: number; nodeId: string; location: PortRole; portData: PortConnection; onClick: () => void; onValueChange: (newValue: any) => void }) {
  var portDescription = PortColor[portData.type];
  var Icon = portDescription.icon;
  var PortSettings = portDescription.input;

  var portSelection = usePortSelection();
  var isSelected = portSelection.hasSelection && portSelection.node === nodeId && portSelection.port === portData.id && portSelection.location === location;

  return (
    <StyledPortGroup transform={`translate(0, ${y})`} width="300" height="30" className={`${portData.type} ${isSelected ? "selected" : ""} `}>
      <PortForeignObject height={PORT_HEIGHT} width={300 - 25 - 12} x={25} y={0}>
        <Fieldset label={portData.label || portData.id} input={(!portData.hasConnection && PortSettings) as any} onChange={onValueChange} value={portData.ownValue} />
      </PortForeignObject>
      <g data-tooltip-id="tooltip" data-tooltip-content={portData.label || portData.id}>
        <circle cx={0} cy={PORT_HEIGHT * 0.5} r={15} onClick={onClick}></circle>
        <Icon x="-12" y="3" scale={10} onClick={onClick}></Icon>
      </g>
    </StyledPortGroup>
  );
}
