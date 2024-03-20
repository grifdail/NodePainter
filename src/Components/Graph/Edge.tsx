import { animated, FrameValue, to } from "@react-spring/web";
import { PortType } from "../../Types/PortType";
import styled from "styled-components";

export const EdgePath = styled(animated.path)`
  stroke: var(--color-property);
  stroke-width: 10px;
  fill: none;
`;

export function Edge({ start, end, type, reverse }: { start: FrameValue<number[]>; end: FrameValue<number[]>; type: PortType; reverse?: boolean }) {
  if (reverse) {
    [start, end] = [end, start];
  }

  return (
    <EdgePath
      className={type}
      d={to([start, end], (pointa, pointB) => {
        if (pointa && pointB) {
          const [xs, ys] = pointa;
          const [xe, ye] = pointB;
          var dx = Math.abs(xe - xs) / 2 + 20;
          return `M ${xs} ${ys} C ${xs + dx} ${ys} ${xe - dx} ${ye} ${xe} ${ye}`;
        }
        return "";
      })}
    ></EdgePath>
  );
}
