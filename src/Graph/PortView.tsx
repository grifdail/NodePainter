import React from "react";
import { PortDefinition } from "../Data/NodeDefinition";
import { PortConnection } from "../Data/PortConnection";
import { PortColor } from "./GraphNode";

export function PortView({ y, portDefinition, portData }: { y: number; portDefinition: PortDefinition; portData: PortConnection }) {
  var portDescription = PortColor[portDefinition.type];
  var Icon = portDescription.icon;
  return (
    <g transform={`translate(0, ${y})`} width="200" height="30" className="port">
      <rect x="0" y="0" width="200" height="30" fill="rgba(0,0,0,0.1)"></rect>
      <text fill="black" x="25" y="15" fontSize={15} alignmentBaseline="middle">
        {portDefinition.id}
      </text>
      <circle cx={0} cy={15} r={15} stroke={portDescription.color} fill="white" strokeWidth={2}></circle>
      <Icon color={portDescription.color} x="-12" y="3" scale={10}></Icon>
    </g>
  );
}
