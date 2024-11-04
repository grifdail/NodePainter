import { Icon, IconBrush, IconBucketDroplet, IconCircle, IconEraser, IconLine, IconRectangle } from "@tabler/icons-react";
import p5, { Graphics } from "p5";
import { PaintingStore, PaintingTool } from "../../../Hooks/usePainting";
import { toHex, toRGB255Array } from "../../../Utils/colorUtils";
import { floodFill } from "./floodfill";

export type PaintingToolDef = {
  hasFillMode?: boolean;
  hasColor?: boolean;
  hasLineWidth?: boolean;
  onFrameMouseDown?: (graphic: Graphics, p5: p5, paintingState: PaintingStore, mouse: [number, number], pmouse: [number, number], startClick: [number, number] | null) => void;
  onMouseReleased?: (graphic: Graphics, p5: p5, paintingState: PaintingStore, mouse: [number, number], pmouse: [number, number], startClick: [number, number] | null) => void;
  onMousePressed?: (graphic: Graphics, p5: p5, paintingState: PaintingStore, mouse: [number, number], pmouse: [number, number], startClick: [number, number] | null) => void;
  onPreview?: (p5: p5, paintingState: PaintingStore, mouse: [number, number], pmouse: [number, number], startClick: [number, number] | null, hasPointer: boolean) => void;
  icon: Icon;
  label: string;
};

export const Tools: { [key in PaintingTool]: PaintingToolDef } = {
  pen: {
    icon: IconBrush,
    label: "Brush",
    onFrameMouseDown(graphic, p5, paintingState, mouse, pmouse, startClick) {
      graphic.stroke(toHex(paintingState.color));
      graphic.strokeWeight(paintingState.lineWidth);
      graphic.line(mouse[0], mouse[1], pmouse[0], pmouse[1]);
    },
    onMouseReleased: undefined,
    onMousePressed: undefined,
    onPreview(p5, paintingState, mouse, pmouse, startClick, hasPointer) {
      if (!hasPointer) {
        return;
      }
      p5.stroke(toHex(paintingState.color));
      p5.strokeWeight(paintingState.lineWidth);
      p5.point(mouse[0], mouse[1]);
    },
    hasColor: true,
    hasLineWidth: true,
  },
  fill: {
    label: "Fill",
    icon: IconBucketDroplet,
    onMouseReleased: undefined,
    onMousePressed(graphic, p5, paintingState, mouse, pmouse, startClick) {
      floodFill({ x: Math.floor(mouse[0]), y: Math.floor(mouse[1]) }, toRGB255Array(paintingState.color), graphic, 10);
    },
    onPreview(p5, paintingState, mouse, pmouse, startClick, hasPointer) {
      if (!hasPointer) {
        return;
      }
      p5.stroke(toHex(paintingState.color));
      p5.strokeWeight(5);
      p5.point(mouse[0], mouse[1]);
    },
    hasColor: true,
  },
  eraser: {
    icon: IconEraser,
    label: "Eraser",
    onFrameMouseDown(graphic, p5, paintingState, mouse, pmouse, startClick) {
      graphic.erase();
      graphic.stroke(toHex(paintingState.color));
      graphic.strokeWeight(paintingState.lineWidth);
      graphic.line(mouse[0], mouse[1], pmouse[0], pmouse[1]);
      graphic.noErase();
    },
    onMouseReleased: undefined,
    onMousePressed: undefined,
    onPreview(p5, paintingState, mouse, pmouse, startClick, hasPointer) {
      if (!hasPointer) {
        return;
      }
      p5.erase();
      p5.stroke(toHex(paintingState.color));
      p5.strokeWeight(paintingState.lineWidth);
      p5.point(mouse[0], mouse[1]);
      p5.noErase();
    },

    hasLineWidth: true,
  },
  line: {
    icon: IconLine,
    label: "Line",
    onFrameMouseDown: undefined,
    onMouseReleased(graphic, p5, paintingState, mouse, pmouse, startClick) {
      if (startClick == null) {
        return;
      }
      graphic.stroke(toHex(paintingState.color));
      graphic.strokeWeight(paintingState.lineWidth);
      graphic.line(mouse[0], mouse[1], startClick[0], startClick[1]);
    },
    onMousePressed: undefined,
    onPreview(p5, paintingState, mouse, pmouse, startClick, hasPointer) {
      p5.stroke(toHex(paintingState.color));
      p5.strokeWeight(paintingState.lineWidth);
      if (startClick !== null) {
        p5.line(mouse[0], mouse[1], startClick[0], startClick[1]);
      } else if (hasPointer) {
        p5.point(mouse[0], mouse[1]);
      }
    },
    hasColor: true,
    hasLineWidth: true,
  },
  circle: {
    icon: IconCircle,
    label: "Circle",
    onFrameMouseDown: undefined,
    onMouseReleased(graphic, p5, paintingState, mouse, pmouse, startClick) {
      if (startClick == null) {
        return;
      }
      if (paintingState.fillMode === "stroke") {
        graphic.stroke(toHex(paintingState.color));
        graphic.strokeWeight(paintingState.lineWidth);
        graphic.noFill();
      } else {
        graphic.noStroke();
        graphic.fill(toHex(paintingState.color));
      }
      var w = Math.abs(mouse[0] - startClick[0]);
      var h = Math.abs(mouse[1] - startClick[1]);
      if (p5.keyIsDown(p5.SHIFT)) {
        h = w = Math.min(w, h);
      }
      if (p5.keyIsDown(p5.CONTROL)) {
        graphic.ellipse(startClick[0], startClick[1], w * 2, h * 2);
      } else {
        graphic.ellipse(startClick[0] + (w / 2) * Math.sign(mouse[0] - startClick[0]), startClick[1] + (h / 2) * Math.sign(mouse[1] - startClick[1]), w, h);
      }
    },
    onMousePressed: undefined,
    onPreview(p5, paintingState, mouse, pmouse, startClick, hasPointer) {
      if (paintingState.fillMode === "stroke") {
        p5.stroke(toHex(paintingState.color));
        p5.strokeWeight(paintingState.lineWidth);
        p5.noFill();
      } else {
        p5.noStroke();
        p5.fill(toHex(paintingState.color));
      }

      if (startClick !== null) {
        let w = Math.abs(mouse[0] - startClick[0]);
        let h = Math.abs(mouse[1] - startClick[1]);
        if (p5.keyIsDown(p5.SHIFT)) {
          h = w = Math.min(w, h);
        }
        if (p5.keyIsDown(p5.CONTROL)) {
          p5.ellipse(startClick[0], startClick[1], w * 2, h * 2);
        } else {
          p5.ellipse(startClick[0] + (w / 2) * Math.sign(mouse[0] - startClick[0]), startClick[1] + (h / 2) * Math.sign(mouse[1] - startClick[1]), w, h);
        }
      } else if (hasPointer) {
        p5.point(mouse[0], mouse[1]);
      }
    },
    hasColor: true,
    hasLineWidth: true,
    hasFillMode: true,
  },
  rectangle: {
    icon: IconRectangle,
    label: "Rectangle",
    onFrameMouseDown: undefined,
    onMouseReleased(graphic, p5, paintingState, mouse, pmouse, startClick) {
      if (startClick == null) {
        return;
      }
      if (paintingState.fillMode === "stroke") {
        graphic.stroke(toHex(paintingState.color));
        graphic.strokeWeight(paintingState.lineWidth);
        graphic.noFill();
      } else {
        graphic.noStroke();
        graphic.fill(toHex(paintingState.color));
      }
      let w = mouse[0] - startClick[0];
      let h = mouse[1] - startClick[1];
      if (p5.keyIsDown(p5.SHIFT)) {
        h = w = Math.max(Math.abs(w), Math.abs(h));
        w *= Math.sign(mouse[0] - startClick[0]);
        h *= Math.sign(mouse[1] - startClick[1]);
      }
      if (p5.keyIsDown(p5.CONTROL)) {
        graphic.rect(startClick[0] - w, startClick[1] - h, w * 2, h * 2);
      } else {
        graphic.rect(startClick[0], startClick[1], w, h);
      }
    },
    onMousePressed: undefined,
    onPreview(p5, paintingState, mouse, pmouse, startClick, hasPointer) {
      if (paintingState.fillMode === "stroke") {
        p5.stroke(toHex(paintingState.color));
        p5.strokeWeight(paintingState.lineWidth);
        p5.noFill();
      } else {
        p5.noStroke();
        p5.fill(toHex(paintingState.color));
      }

      if (startClick !== null) {
        let w = mouse[0] - startClick[0];
        let h = mouse[1] - startClick[1];
        if (p5.keyIsDown(p5.SHIFT)) {
          h = w = Math.max(Math.abs(w), Math.abs(h));
          w *= Math.sign(mouse[0] - startClick[0]);
          h *= Math.sign(mouse[1] - startClick[1]);
        }
        if (p5.keyIsDown(p5.CONTROL)) {
          p5.rect(startClick[0] - w, startClick[1] - h, w * 2, h * 2);
        } else {
          p5.rect(startClick[0], startClick[1], w, h);
        }
      } else if (hasPointer) {
        p5.point(mouse[0], mouse[1]);
      }
    },
    hasColor: true,
    hasLineWidth: true,
    hasFillMode: true,
  },
};
