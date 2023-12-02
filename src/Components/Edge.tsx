import { PortColor } from "./StyledComponents/PortColor";
import { animated, FrameValue, to } from "@react-spring/web";
import { PortType } from "../Data/PortType";

export function Edge({ start, end, type, reverse }: { start: FrameValue<number[]>; end: FrameValue<number[]>; type: PortType; reverse?: boolean }) {
  if (reverse) {
    [start, end] = [end, start];
  }

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
