import { animated, FrameValue, to } from "@react-spring/web";
import { PortType } from "../../Types/PortType";
import styled from "styled-components";

const LinePath = styled(animated.path)`
  stroke: var(--color-pairing);
  stroke-width: 10px;
  fill: none;
  stroke-dasharray: 10 15;
`;

export function PairingLine({ start, end }: { start: FrameValue<number[]>; end: FrameValue<number[]> }) {
  return (
    <LinePath
      d={to([start, end], (pointa, pointB) => {
        if (pointa && pointB) {
          const [xs, ys] = pointa;
          const [xe, ye] = pointB;
          return `M ${xs} ${ys} L ${xe} ${ye}`;
        }
        return "";
      })}></LinePath>
  );
}
