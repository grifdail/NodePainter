import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { PaintingStore, usePainting } from "../../Hooks/usePainting";
import { toHex, toRGB255Array } from "../../Utils/colorUtils";
import { Graphics, Vector } from "p5";
import { VectorSquareDistance } from "../../Utils/vectorUtils";

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

  var graphic: Graphics | null = null;

  p5.setup = () => {
    p5.createCanvas(paintingState?.width || 400, paintingState?.height || 400);
    graphic = p5.createGraphics(paintingState?.width || 400, paintingState?.height || 400);
    graphic.pixelDensity(1);

    graphic.noSmooth();
  };

  p5.updateWithProps = (props: MySketchProps) => {
    paintingState = props.painting;
    if (paintingState.width != p5.width || paintingState.height != p5.height) {
      p5.createCanvas(paintingState?.width || 400, paintingState?.height || 400);
      graphic = p5.createGraphics(paintingState?.width || 400, paintingState?.height || 400);
      graphic.pixelDensity(1);
      graphic.noSmooth();
    }
  };

  p5.draw = () => {
    if (graphic == null || paintingState == null) {
      return;
    }
    p5.clear(0, 0, 0, 0);
    p5.image(graphic, 0, 0);
    if (p5.mouseIsPressed) {
      if (paintingState?.tool === "pen") {
        graphic.stroke(toHex(paintingState.color));
        graphic.strokeWeight(paintingState.lineWidth);
        graphic.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      }
      if (paintingState?.tool === "eraser") {
        graphic.erase();
        graphic.stroke(toHex(paintingState.color));
        graphic.strokeWeight(paintingState.lineWidth);
        graphic.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        graphic.noErase();
      }
      if (paintingState?.tool === "fill") {
        floodFill({ x: Math.floor(p5.mouseX), y: Math.floor(p5.mouseY) }, toRGB255Array(paintingState.color), graphic, Math.pow(paintingState.lineWidth, 2));
      }
    }
    p5.stroke(toHex(paintingState.color));
    p5.strokeWeight(paintingState.lineWidth);
    p5.point(p5.mouseX, p5.mouseY);
  };

  function arrayEquals(a: number[], b: number[], sensibility: number = 10) {
    return VectorSquareDistance(a, b) < sensibility * sensibility;
  }
  type vec = { x: number; y: number };

  function expandToNeighbours(queue: vec[], current: vec, width: number, height: number) {
    const x = current.x;
    const y = current.y;

    if (x - 1 > 0) {
      queue.push({ x: x - 1, y });
    }

    if (x + 1 < width) {
      queue.push({ x: x + 1, y });
    }

    if (y - 1 > 0) {
      queue.push({ x, y: y - 1 });
    }

    if (y + 1 < height) {
      queue.push({ x, y: y + 1 });
    }

    return queue;
  }

  function floodFill(seed: vec, fillColor: number[], graphics: Graphics, sensibility: number = 10) {
    graphics.loadPixels();

    let index = 4 * (graphics.width * seed.y + seed.x);
    let seedColor = [graphics.pixels[index], graphics.pixels[index + 1], graphics.pixels[index + 2], graphics.pixels[index + 3]];

    let queue = [];
    queue.push(seed);

    while (queue.length > 0 && queue.length < 1000000) {
      let current = queue.shift();
      if (current === undefined) {
        continue;
      }
      index = 4 * (graphics.width * current.y + current.x);
      let color = [graphics.pixels[index], graphics.pixels[index + 1], graphics.pixels[index + 2], graphics.pixels[index + 3]];

      if (!arrayEquals(color, seedColor, sensibility)) {
        continue;
      }

      for (let i = 0; i < 4; i++) {
        graphics.pixels[index + i] = fillColor[0 + i];
      }

      queue = expandToNeighbours(queue, current, graphics.width, graphics.height);
    }

    graphics.updatePixels();
  }
};
