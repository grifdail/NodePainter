import { Snippet, SnippetCollection } from "../Utils/graph/modification/snippets";
import { ColorPalette, Gradient, GradientCollection, PaletteCollection } from "./vectorDataType";

export type PlayerPrefExport = Pick<PlayerPrefStore, "favNodes" | "nodesLastUsedDates" | "nodesUseCount" | "nodeSorting" | "palettes" | "gradient" | "colorPreset" | "hasSeenIntroPopup" | "snippets">;
export type UITheme = "auto" | "light" | "dark" | "rose-pine-moon" | "rose-pine-dawn" | "css";

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
  removeFunction: (name: string) => void;
  colorPreset: ColorPalette;
  setColorPreset: (palette: ColorPalette) => void;
  setSeenIntro: () => void;
  hasSeenIntroPopup: boolean;
  theme: UITheme;
  setTheme: (theme: UITheme) => void;
  css: string;

  saveSnippet(name: string, snippet: Snippet): void;
  removeSnippet(name: string): void;
  snippets: SnippetCollection;
  getExportJson(): PlayerPrefExport;
  loadJson(saveData: PlayerPrefExport): void;
  loadDefaultPaletteCollection: () => void;
  resetNodeUsageInformation: () => void;
  removeDefaultPalettes: () => void;
};
export type SortingType = "featured" | "name" | "last" | "most";
