import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import styled from "styled-components";
import { useMeasure } from "@uidotdev/usehooks";
import { Graphics } from "p5";
import { Color } from "../../../Types/vectorDataType";
import { Flipbook, FlipbookLine } from "../../../Types/FlipBook";
import { toP5Color } from "../../../Utils/math/colorUtils";
import { vectorMultiplication } from "../../../Utils/math/vectorUtils";
import { trueMod } from "../../../Utils/math/trueMod";
import { useEffect } from "react";
import { re } from "mathjs";
import { SVGBackgroundTransparentPattern } from "./SVGBackgroundTransparentPattern";
import { PainterFrame } from "./PainterFrame";
import { Frame } from "./Frame";

const Preview = styled.div<{ scale: number; basis: number }>`
  flex: 1 0 ${(props) => props.basis}px;
  position: relative;
  min-height: ${(props) => props.basis}px;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & svg {
    flex: 0 0 400px;
    padding: 0;
    margin: 0;
    width: 400px;
    height: 400px;
    display: block;
    background: var(--gradient-transparent);
    border: 1px solid var(--color-border);


    touch-action: none;
  
  }

  @media (max-width: 800px) {


    & > div {
      transform: scale(${(state) => state.scale});
      aspect-ratio: 1;
    }
  }
`;


export function FlipbookSketch(props: FlipbookSketchProps) {
  const [ref, { width, height }] = useMeasure();

  const scale = width !== null ? (width < 400 ? width / 400 : 1) : 1

  return (
    <Preview scale={scale} basis={400}>
      <div ref={ref}>
        <svg width={400} height={400} viewBox="0 0 1 1">
          <defs>
            <SVGBackgroundTransparentPattern></SVGBackgroundTransparentPattern>
          </defs>
          <rect x={0} y={0} width="100%" height="100%" fill="url(#grid)" style={{ touchAction: "none" }}></rect>

          {
            props.useOnionSkin && props.animation.length > 1 &&
            <Frame frame={props.animation[trueMod(props.frame - 1, props.animation.length)]} opacity={0.1}></Frame>
          }
          <Frame frame={props.animation[trueMod(props.frame, props.animation.length)]}></Frame>
          <PainterFrame frame={props.frame} lineWidth={props.lineWidth} color={props.color} editMode="draw" addLine={props.addLine} />
        </svg>
      </div>
    </Preview >
  );
}

type FlipbookSketchProps = {
  useOnionSkin: boolean;
  frame: number,
  animation: Flipbook,
  color: Color,
  lineWidth: number,
  editMode: "draw" | "erase"
  addLine: (line: FlipbookLine, frameIndex?: number) => void
  removeLine: (lineIndex: number, frameIndex?: number) => void
};




