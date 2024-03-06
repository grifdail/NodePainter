import tsWhammy from "ts-whammy";
import { CanvasExporter } from "./CanvasExporter";

export function WhammyExporter(): CanvasExporter {
  let frames: string[] = [];
  let _onFinished: (b: Blob) => void;
  let delay = 0;
  return {
    init(width, height, frameDelay, onFinished, onProgress) {
      frames = [];
      _onFinished = onFinished;
      delay = frameDelay;
    },
    addFrame(canvas) {
      frames.push(canvas.canvas.toDataURL());
    },
    render() {
      tsWhammy.fixImageDataList(frames).then((newFrames) => {
        var blob = tsWhammy.fromImageArray(newFrames, 1000 / delay) as Blob;
        _onFinished(blob);
      });
    },
  };
}
