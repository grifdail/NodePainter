import { create } from "zustand";
import { DefaultPalettes } from "../Data/Palettes";
import { ImageData } from "../Types/ImageData";
import { Routes } from "../Types/Routes";
import { Color, ColorPalette, createColor } from "../Types/vectorDataType";
import { usePlayerPref } from "./usePlayerPref";
import { useRouter } from "./useRouter";

export type PaintingTool = "pen" | "eraser" | "fill";

export type PaintingStore = {
  callback: ((newValue: any) => void) | null;
  baseImage: ImageData | null;
  colorPalette: ColorPalette;
  color: Color;
  tool: PaintingTool;
  lineWidth: number;
  width: number;
  height: number;
  open: (current: ImageData, callback: (newValue: any) => void) => void;
  close: () => void;
  setTool: (tool: PaintingTool) => void;
  setLineWidth: (size: number) => void;
  setColor: (color: Color) => void;
  setColorPalette: (colorPalette: ColorPalette) => void;
};

export const usePainting = create<PaintingStore>()((set) => {
  return {
    callback: null,
    baseImage: null,
    width: 400,
    height: 400,
    colorPalette: DefaultPalettes.Pico8,
    color: createColor(0, 0, 0, 1),
    tool: "pen",
    lineWidth: 10,
    open(current, callback) {
      set({ callback: callback, baseImage: current, colorPalette: usePlayerPref.getState().colorPreset });

      useRouter.getState().open(Routes.Paint);
    },
    close: () => {
      //save the image to the node
      useRouter.getState().close();
    },
    setLineWidth(size) {
      set({ lineWidth: size });
    },
    setTool(tool) {
      set({ tool: tool });
    },
    setColor(color) {
      set({ color: color });
    },
    setColorPalette(colorPalette) {
      set({ colorPalette: colorPalette });
    },
  };
});
