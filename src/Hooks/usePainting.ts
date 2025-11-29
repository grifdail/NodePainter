import { Graphics } from "p5";
import { create } from "zustand";
import { closeAllPopup, openPaintModal } from "../Actions/navigationAction";
import { DefaultPalettes } from "../Data/Palettes";
import { Color, ColorPalette, createColor } from "../Types/vectorDataType";
import { usePlayerPref } from "./usePlayerPref";

export type PaintingTool = "pen" | "eraser" | "fill" | "line" | "circle" | "rectangle";

export type PaintingStore = {
  clearCount: number;
  saveImage: (g: Graphics) => void;
  callback: ((newValue: any) => void) | null;
  baseImage: string | null;
  colorPalette: ColorPalette;
  color: Color;
  tool: PaintingTool;
  lineWidth: number;
  fillMode: "fill" | "stroke";
  width: number;
  height: number;
  open: (current: string, callback: (newValue: any) => void) => void;
  close: () => void;
  setTool: (tool: PaintingTool) => void;
  setLineWidth: (size: number) => void;
  setColor: (color: Color) => void;
  clear: () => void;
  setColorPalette: (colorPalette: ColorPalette) => void;
  setFillMode: (newMode: "fill" | "stroke") => void;
  togleFillMode: () => void;
  newImage(width: number, height: number): unknown;
};

export const usePainting = create<PaintingStore>()((set, get) => {
  return {
    callback: null,
    baseImage: null,
    width: 400,
    height: 400,
    colorPalette: DefaultPalettes.Pico8,
    color: createColor(0, 0, 0, 1),
    tool: "pen",
    lineWidth: 10,
    clearCount: 0,
    fillMode: "fill",
    open(current, callback) {
      set({ callback: callback, baseImage: current, colorPalette: usePlayerPref.getState().colorPreset, width: 400, height: 400 });
      if (current != null) {
        var img = new Image();
        img.onload = () => {
          set({ width: img.width, height: img.height });
        };
        img.src = current;
      }

      openPaintModal();
    },
    close: () => {
      //save the image to the node
      closeAllPopup()
    },
    setLineWidth(size) {
      size = Math.round(Math.max(size, 1));
      set({ lineWidth: size });
    },
    setTool(tool) {
      set({ tool: tool });
    },
    setColor(color) {
      set((state) => ({ color: color, tool: state.tool === "eraser" ? "pen" : state.tool }));
    },
    setColorPalette(colorPalette) {
      set({ colorPalette: colorPalette });
    },
    clear() {
      set((state) => ({ clearCount: state.clearCount + 1 }));
    },
    newImage(width, height) {
      set((state) => ({ clearCount: state.clearCount + 1, width: width, height: height }));
    },
    saveImage(g) {
      if (g == null) {
        return;
      }

      var callback = get().callback;
      if (callback != null) {
        callback(g.drawingContext.canvas.toDataURL() as any);
      }
    },
    togleFillMode() {
      set((state) => ({ fillMode: state.fillMode === "fill" ? "stroke" : "fill" }));
    },
    setFillMode(newMode) {
      set((state) => ({ fillMode: newMode }));
    },
  };
});
