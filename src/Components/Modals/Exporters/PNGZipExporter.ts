import JSZip from "jszip";
import { CanvasExporter } from "./CanvasExporter";

export function PNGZipExporter(): CanvasExporter {
  let zip: JSZip;
  let _onFinished: (b: Blob) => void;
  let imageCount = 0;
  return {
    init(width, height, frameDelay, onFinished, onProgress) {
      _onFinished = onFinished;
      zip = new JSZip();
      return Promise.resolve();
    },
    addFrame(canvas) {
      var url = `frame-${imageCount}.png`;
      canvas.canvas.toBlob((blob: Blob) => {
        zip.file(url, blob);
      });
      imageCount++;
    },
    render() {
      zip.generateAsync({ type: "blob", compression: "DEFLATE" }).then((blob) => _onFinished(blob));
    },
  };
}
PNGZipExporter.extension = "zip";
