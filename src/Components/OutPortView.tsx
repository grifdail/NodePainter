import React from "react";
import { PortType } from "../Data/PortType";
import { PortColor } from "./PortColor";

export function OutPortView({ x, y, id, type, hideLabel, onClick }: { x: number; y: number; hideLabel?: boolean; id: string; type: PortType; onClick: () => void }) {
  var portDescription = PortColor[type];
  var Icon = portDescription.icon;
  return (
    <g transform={`translate(${x}, ${y})`} width="200" height="30" className="port">
      <rect x="-98" y="0" width="98" height="30" fill="rgba(0,0,0,0.1)" visibility={hideLabel ? "hidden" : "visible"}></rect>
      <text fill="black" x="-25" y="15" fontSize={15} alignmentBaseline="middle" textAnchor="end" visibility={hideLabel ? "hidden" : "visible"}>
        {id}
      </text>
      <circle cx={0} cy={15} r={15} stroke={portDescription.color} fill="white" strokeWidth={2} onClick={onClick}></circle>
      <Icon color={portDescription.color} x="-12" y="3" scale={10} onClick={onClick}></Icon>
    </g>
  );
}
