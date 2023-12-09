import React from "react";
import styled from "styled-components";
import { PortColor } from "../StyledComponents/PortColor";
import { PortConnection } from "../../Hooks/useTree";

const PortForeignObject = styled.foreignObject`
  margin: 0;
  padding: 0;
  padding-right: 5px;
  position: relative;
  display: block;
  & > div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    max-width: 175px;
    //overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex: 1 0;
    flex-wrap: nowrap;

    & > p {
      flex: 1 1;
      min-width: 50px;
    }

    & input {
      flex: 1 1 10px;
      display: block;
      flex-direction: row;
      max-width: 150px;
      width: 10px;
      text-align: right;
      margin: 1px;
    }

    & > div {
      flex: 1 1 10px;
      max-width: 175px;
      display: flex;
      flex-direction: row;
      overflow: 0;
    }
  }
`;

export function PortView({ y, portData, onClick, onValueChange }: { y: number; portData: PortConnection; onClick: () => void; onValueChange: (newValue: any) => void }) {
  var portDescription = PortColor[portData.type];
  var Icon = portDescription.icon;
  var PortSettings = portDescription.input;
  return (
    <g transform={`translate(0, ${y})`} width="200" height="30" className="port">
      <rect x="0" y="0" width="200" height="30" fill="rgba(0,0,0,0.1)"></rect>
      <PortForeignObject height={30} width={175} x={25} y={0}>
        <div>
          <p>{portData.id}</p>
          {!portData.hasConnection && PortSettings && <PortSettings onChange={onValueChange} value={portData.ownValue} />}
        </div>
      </PortForeignObject>

      <circle cx={0} cy={15} r={15} stroke={portDescription.color} fill="white" strokeWidth={2} onClick={onClick}></circle>
      <Icon color={portDescription.color} x="-12" y="3" scale={10} onClick={onClick}></Icon>
    </g>
  );
}
