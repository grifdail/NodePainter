import React from "react";
import { PortColor } from "./GraphNode";
import { animated, Interpolation, to } from "@react-spring/web";
import { PortType } from "../Data/PortType";

export function Edge({ start, end, type }: { start: Interpolation<number[], number[]>; end: Interpolation<number[], number[]>; type: PortType }) {
  return (
    <animated.path
      d={to([start, end], (pointa, pointB) => {
        if (pointa && pointB) {
          const [xs, ys] = pointa;
          const [xe, ye] = pointB;
          var dx = Math.abs(xe - xs) / 2 + 20;
          return `M ${xs} ${ys} C ${xs + dx} ${ys} ${xe - dx} ${ye} ${xe} ${ye}`;
        }
        return "";
      })}
      stroke={PortColor[type].color}
      strokeWidth={10}
      fill="none"
    ></animated.path>
  );
}
