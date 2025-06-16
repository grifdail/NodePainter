import { GifExporter } from "./GifExporter";
import { MP4Exporter } from "./MP4Exporter";
import { PNGZipExporter } from "./PNGZipExporter";
import { WhammyExporter } from "./WhammyExporter";

export const Exporters = {
  webM: WhammyExporter,
  gif: GifExporter,
  mp4: MP4Exporter,
  png: PNGZipExporter,
};

export type ExporterType = keyof typeof Exporters;
