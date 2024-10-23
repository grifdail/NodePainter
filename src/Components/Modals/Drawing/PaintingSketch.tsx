import { ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { PaintingStore, usePainting } from "../../../Hooks/usePainting";
import { Graphics } from "p5";
import { Tools } from "./Tools";

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

export function PaintingSketch({ onSaveGraphics }: { onSaveGraphics: (g: Graphics) => void }) {
  var dim = useWindowSize();
  var paintingState = usePainting();

  var smallestDim = Math.min(1, Math.min(dim.width || paintingState.width || 400, dim.height || paintingState.height || 400) / 450);
  return (
    <Preview scale={smallestDim}>
      <ReactP5Wrapper sketch={sketch} onSaveGraphics={onSaveGraphics} painting={paintingState} key={`${paintingState.width} / ${paintingState.height}`} scale={smallestDim} />
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
      p5.createCanvas(paintingState?.width || 400, paintingState?.height || 400);
      graphic = p5.createGraphics(paintingState?.width || 400, paintingState?.height || 400);
      graphic.pixelDensity(1);
      graphic.noSmooth();
      clearCount = paintingState.clearCount;
    }
    if (paintingState.baseImage != null && firstInit) {
      var img = p5.loadImage(paintingState.baseImage, () => {
        graphic?.image(img, 0, 0, graphic.width, graphic.height);
      });
    }
  };

  p5.mousePressed = () => {
    if (graphic == null || paintingState == null) {
      return;
    }
    startMousePosition = [p5.mouseX / scale, p5.mouseY / scale];
    var tool = Tools[paintingState.tool];
    if (tool.onMousePressed !== undefined) {
      tool.onMousePressed(graphic, p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
    }
  };

  p5.mouseReleased = () => {
    if (graphic == null || paintingState == null) {
      return;
    }
    var tool = Tools[paintingState.tool];
    if (tool.onMouseReleased !== undefined) {
      tool.onMouseReleased(graphic, p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
    }
    startMousePosition = null;
    onSaveGraphics(graphic as Graphics);
  };

  p5.draw = () => {
    if (graphic == null || paintingState == null) {
      return;
    }
    p5.clear(0, 0, 0, 0);
    p5.image(graphic, 0, 0);
    var tool = Tools[paintingState.tool];
    if (p5.mouseIsPressed) {
      if (tool.onFrameMouseDown !== undefined) {
        tool.onFrameMouseDown(graphic, p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
      }
    }

    if (tool.onPreview !== undefined) {
      tool.onPreview(p5, paintingState, [p5.mouseX / scale, p5.mouseY / scale], [p5.pmouseX / scale, p5.pmouseY / scale], startMousePosition);
    }
  };
};
