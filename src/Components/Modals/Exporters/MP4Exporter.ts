import * as HME from "h264-mp4-encoder";
import { CanvasExporter } from "./CanvasExporter";

export function MP4Exporter(): CanvasExporter {
  let _encoder: HME.H264MP4Encoder;
  let _onFinished: (b: Blob) => void;

  return {
    init(width, height, frameDelay, onFinished, onProgress) {
      _onFinished = onFinished;
      return HME.createH264MP4Encoder().then((encoder) => {
        _encoder = encoder;
        // Must be a multiple of 2.
        encoder.width = width;
        encoder.height = height;
        encoder.frameRate = 1000 / frameDelay;
        encoder.initialize();
      });
    },
    addFrame(canvas) {
      _encoder.addFrameRgba(canvas.getImageData(0, 0, _encoder.width, _encoder.height).data);
    },
    render() {
      _encoder.finalize();
      const uint8Array = _encoder.FS.readFile(_encoder.outputFilename);

      var blob = new Blob([uint8Array as any], { type: "video/mp4" });
      _onFinished(blob);
      _encoder.delete();
    },
  };
}
MP4Exporter.extension = "mp4";
