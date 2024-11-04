import { ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import styled from "styled-components";
import { useMeasure } from "@uidotdev/usehooks";
import { PaintingStore, usePainting } from "../../../Hooks/usePainting";
import { Graphics } from "p5";
import { Tools } from "./Tools";

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

  & canvas {
    padding: 0;
    margin: 0;
    background: var(--gradient-transparent);
    border: 1px solid var(--color-border);
  }

  @media (max-width: 800px) {
    flex: 1 1 10px;
    min-height: 0;

    & > div {
      transform: scale(${(state) => state.scale});
    }
  }
`;

export function PaintingSketch({ onSaveGraphics }: { onSaveGraphics: (g: Graphics) => void }) {
  const [ref, { width, height }] = useMeasure();
  var paintingState = usePainting();

  var smallestDim = Math.min(1, Math.min((width || paintingState.width || 400) / paintingState.width, (height || paintingState.height || 400) / paintingState.height));
  return (
    <Preview scale={smallestDim} basis={paintingState.width}>
      <div ref={ref}>
        <ReactP5Wrapper sketch={sketch} onSaveGraphics={onSaveGraphics} painting={paintingState} scale={smallestDim} />
      </div>
    </Preview>
  );
}
type MySketchProps = SketchProps & {
  painting: PaintingStore;
  onSaveGraphics: (g: Graphics) => void;
  scale: number;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let paintingState: PaintingStore | null = null;
  var onSaveGraphics: (g: Graphics) => void = () => {};
  var clearCount = 0;
  var scale = 0;
  var startMousePosition: [number, number] | null = null;

  var graphic: Graphics | null = null;

  let mouseJustPressed = false;

  let mouseJustReleased = false;
  let historyPast: string[] = [];
  let historyForward: string[] = [];

  p5.setup = () => {
    p5.createCanvas(paintingState?.width || 0, paintingState?.height || 0);
    graphic = p5.createGraphics(paintingState?.width || 0, paintingState?.height || 0);
    graphic.pixelDensity(1);
    graphic.noSmooth();
  };

  p5.updateWithProps = (props: MySketchProps) => {
    var firstInit = paintingState == null;
    paintingState = props.painting;
    onSaveGraphics = props.onSaveGraphics;
    scale = props.scale;

    if (paintingState.width !== p5.width || paintingState.height !== p5.height || firstInit || paintingState.clearCount !== clearCount) {
      var canvas = p5.createCanvas(paintingState?.width || 400, paintingState?.height || 400);
      graphic = p5.createGraphics(paintingState?.width || 400, paintingState?.height || 400);
      graphic.pixelDensity(1);
      graphic.noSmooth();
      clearCount = paintingState.clearCount;
      canvas.mousePressed(mousePressed);
      canvas.mouseReleased(mouseReleased);
      canvas.mouseMoved((e) => console.log(e.preventDefault()));
      canvas.touchMoved((e) => console.log(e.preventDefault()));
      canvas.touchStarted(mousePressed);
      canvas.touchEnded(mouseReleased);
      historyPast = [graphic.drawingContext.canvas.toDataURL()];
      historyForward = [];
    }
    if (paintingState.baseImage != null && firstInit) {
      var img = p5.loadImage(paintingState.baseImage, () => {
        graphic?.image(img, 0, 0, graphic.width, graphic.height);
      });
    }
  };

  p5.keyPressed = (e: Event) => {
    if (p5.keyIsDown(p5.CONTROL) && p5.keyIsDown(90)) {
      moveHistory(historyForward, historyPast);
    } else if (p5.keyIsDown(p5.CONTROL) && p5.keyIsDown(89)) {
      moveHistory(historyPast, historyForward);
    }
  };

  const moveHistory = (forward: string[], past: string[]) => {
    if (past.length > 0) {
      const [deleted] = past.splice(past.length - 1, 1);
      forward.push(deleted);
      if (historyPast.length > 0) {
        const img = p5.loadImage(historyPast[historyPast.length - 1], () => {
          graphic?.clear();
          graphic?.image(img, 0, 0, graphic.width, graphic.height);
        });
      }
    }
  };

  const mousePressed = (e: any) => {
    mouseJustPressed = true;
  };

  const mouseReleased = () => {
    mouseJustReleased = true;
  };

  p5.draw = () => {
    if (graphic == null || paintingState == null) {
      return;
    }
    p5.clear(0, 0, 0, 0);
    p5.image(graphic, 0, 0);
    var tool = Tools[paintingState.tool];
    if (mouseJustPressed) {
      mouseJustPressed = false;
      startMousePosition = [p5.mouseX / scale, p5.mouseY / scale];
      if (tool.onMousePressed !== undefined) {
        tool.onMousePressed(graphic, p5, paintingState, startMousePosition, [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
      }
    }
    if (p5.mouseIsPressed) {
      if (tool.onFrameMouseDown !== undefined) {
        tool.onFrameMouseDown(graphic, p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
      }
    }
    if (mouseJustReleased) {
      mouseJustReleased = false;
      if (tool.onMouseReleased !== undefined) {
        tool.onMouseReleased(graphic, p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
      }
      startMousePosition = null;
      historyPast.push(graphic.drawingContext.canvas.toDataURL());
      if (historyPast.length > 10) {
        historyPast.splice(0, 1);
      }
      historyForward = [];
      onSaveGraphics(graphic as Graphics);
    }

    if (tool.onPreview !== undefined) {
      var hasPointer = matchMedia("(pointer:fine)").matches;
      tool.onPreview(p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition, hasPointer);
    }
  };
};
