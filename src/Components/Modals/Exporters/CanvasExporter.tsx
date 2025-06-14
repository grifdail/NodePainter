export type CanvasExporter = {
  init: (width: number, height: number, frameDelay: number, onFinished: (blob: Blob) => void, onProgress: (state: number, p: any) => void) => Promise<any>;
  addFrame: (canvas: any) => void;
  render: () => void;
};

export type CanvasExporterFactory = (() => CanvasExporter) & { extension: string };
