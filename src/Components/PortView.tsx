import React from "react";
import { PortDefinition } from "../Data/NodeDefinition";
import { PortColor } from "./PortColor";
import { PortConnection } from "../Hooks/useTree";

export function PortView({ y, portDefinition, portData, onClick, onValueChange }: { y: number; portDefinition: PortDefinition; portData: PortConnection; onClick: () => void; onValueChange: (newValue: any) => void }) {
  var portDescription = PortColor[portDefinition.type];
  var Icon = portDescription.icon;
  var PortSettings = portDescription.input;
  return (
    <g transform={`translate(0, ${y})`} width="200" height="30" className="port">
      <rect x="0" y="0" width="200" height="30" fill="rgba(0,0,0,0.1)"></rect>
      <foreignObject height={30} width={150} x={50} y={0}>
        <div>{!portData.hasConnection && PortSettings && <PortSettings onChange={onValueChange} value={portData.ownValue} />}</div>
      </foreignObject>
      <text fill="black" x="25" y="15" fontSize={15} alignmentBaseline="middle">
        {portDefinition.id}
      </text>

      <circle cx={0} cy={15} r={15} stroke={portDescription.color} fill="white" strokeWidth={2} onClick={onClick}></circle>
      <Icon color={portDescription.color} x="-12" y="3" scale={10} onClick={onClick}></Icon>
    </g>
  );
}
