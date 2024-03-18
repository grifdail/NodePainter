import { ColorPalette, Gradient, GradientCollection, PaletteCollection } from "./vectorDataType";

export type PlayerPrefStore = {
  favNodes: string[];
  nodesLastUsedDates: { [key: string]: number };
  nodesUseCount: { [key: string]: number };
  nodeSorting: SortingType;
  setSorting: (sorting: SortingType) => void;
  markNodeAsUsed: (id: string) => void;
  toggleFav: (id: string) => void;
  palettes: PaletteCollection;
  gradient: GradientCollection;
  savePalette: (name: string, palette: ColorPalette) => void;
  saveGradient: (name: string, gradient: Gradient) => void;
  removeGradient: (name: string) => void;
  removePalette: (name: string) => void;
};
export type SortingType = "name" | "last" | "most";
