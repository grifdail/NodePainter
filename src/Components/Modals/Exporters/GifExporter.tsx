import GIF from "gif.js.optimized";
import { CanvasExporter } from "./CanvasExporter";

export function GifExporter(): CanvasExporter {
  let gif: any = null;
  let delay = 32;
  return {
    init(width, height, frameDelay, onFinished, onProgress) {
      gif = new GIF({
        workerScript: "/gif.worker.js",
        workers: 8,
        quality: 5,
        width: width,
        height: height,
        debug: true,
      });
      gif.on("finished", function (blob: Blob) {
        onFinished(blob);
      });
      gif.on("progress", function (p: any) {
        onProgress(1, p);
      });
      delay = frameDelay;
    },
    addFrame(canvas) {
      gif.addFrame(canvas, { delay: delay, copy: true });
    },
    render() {
      gif.render();
    },
  };
}
