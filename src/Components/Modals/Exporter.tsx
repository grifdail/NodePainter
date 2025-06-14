import { GifExporter } from "./Exporters/GifExporter";
import { MP4Exporter } from "./Exporters/MP4Exporter";
import { PNGZipExporter } from "./Exporters/PNGZipExporter";
import { WhammyExporter } from "./Exporters/WhammyExporter";

export const Exporters = {
  webM: WhammyExporter,
  gif: GifExporter,
  mp4: MP4Exporter,
  png: PNGZipExporter,
};

export type ExporterType = keyof typeof Exporters;
