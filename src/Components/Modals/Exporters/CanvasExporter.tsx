export type CanvasExporter = {
  init: (width: number, height: number, frameDelay: number, onFinished: (blob: Blob) => void, onProgress: (state: number, p: any) => void) => void;
  addFrame: (canvas: any) => void;
  render: () => void;
};
