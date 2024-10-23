import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { PaintingStore, usePainting } from "../../Hooks/usePainting";

const Preview = styled.div<{ scale: number }>`
  padding: 20px;
  display: flex;
  justify-content: center;

  & div {
    border: 2px solid black;
    //width: 404px;
    //height: 404px;
    padding: 0;
    margin: 0;
    position: relative;
    font-size: 0;
    line-height: 0;

    & canvas {
      padding: 0;
      margin: 0;
    }
  }

  @media (max-width: 800px), (max-height: 800px) {
    justify-content: center;
    align-items: center;
    background-color: white;

    & div {
      transform: scale(${(state) => state.scale});
    }
  }
`;

export function PaintingSketch() {
  var dim = useWindowSize();
  var paintingState = usePainting();

  var smallestDim = Math.min(1, Math.min(dim.width || paintingState.width || 400, dim.height || paintingState.height || 400) / 450);
  return (
    <Preview scale={smallestDim}>
      <ReactP5Wrapper sketch={sketch} painting={paintingState} key={`${paintingState.width} / ${paintingState.height}`} />
    </Preview>
  );
}
type MySketchProps = SketchProps & {
  painting: PaintingStore;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let paintingState: PaintingStore | null = null;
  var seed = 0;

  p5.setup = () => {};

  p5.updateWithProps = (props: MySketchProps) => {
    paintingState = props.painting;

    p5.createCanvas(paintingState.width || 400, paintingState.height || 400);
  };

  p5.draw = () => {};
};
