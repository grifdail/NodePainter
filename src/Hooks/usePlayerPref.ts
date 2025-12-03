import { produce } from "immer";
import { create } from "zustand";

import { persist } from "zustand/middleware";
import { DefaultGradient, DefaultPalettes } from "../Data/Palettes";
import { PlayerPrefExport, PlayerPrefStore, SortingType, UITheme } from "../Types/PlayerPrefStore";
import { ColorPalette, Gradient } from "../Types/vectorDataType";
import { Snippet } from "../Utils/graph/modification/snippets";

export const usePlayerPref = create<PlayerPrefStore>()(
  persist(
    (set, get) => {
      return {
        authorName: "unknown",
        favNodes: [],
        theme: "auto",
        css: "",
        nodesLastUsedDates: {},
        nodesUseCount: {},
        nodeSorting: "featured",
        palettes: structuredClone(DefaultPalettes),
        gradient: structuredClone(DefaultGradient),
        snippets: {},
        colorPreset: DefaultPalettes.Pico8,
        shortcutVisible: window.matchMedia("(orientation: portrait)").matches,
        setSorting(sorting: SortingType) {
          set({ nodeSorting: sorting });
        },
        setAuthorName(name: string) {
          set({ authorName: name });
        },
        markNodeAsUsed(node) {
          set(
            produce((state) => {
              state.nodesLastUsedDates[node] = Date.now();
              state.nodesUseCount[node] = state.nodesUseCount[node] ? state.nodesUseCount[node] + 1 : 1;
            })
          );
        },
        toggleFav(node) {
          set(
            produce((state) => {
              if (state.favNodes.includes(node) >= 1) {
                state.favNodes = state.favNodes.filter((id: string) => id !== node);
              } else {
                state.favNodes.push(node);
              }
            })
          );
        },
        savePalette(name: string, palette: ColorPalette) {
          set(
            produce((state) => {
              state.palettes[name] = palette;
            })
          );
        },
        saveGradient(name: string, gradient: Gradient) {
          set(
            produce((state) => {
              state.gradient[name] = gradient;
            })
          );
        },
        saveSnippet(name: string, snippet: Snippet) {
          set(
            produce((state) => {
              state.snippets[name] = snippet;
            })
          );
        },
        removeGradient(name: string) {
          set(
            produce((state) => {
              delete state.gradient[name];
            })
          );
        },
        removePalette(name: string) {
          set(
            produce((state) => {
              delete state.palettes[name];
            })
          );
        },
        removeSnippet(name: string) {
          set(
            produce((state) => {
              delete state.snippets[name];
            })
          );
        },
        removeFunction(name) {
          set(
            produce((state) => {
              delete state.savedFunction[name];
            })
          );
        },
        setColorPreset(palette) {
          set((state) => ({ colorPreset: palette }));
        },
        setTheme(theme: UITheme) {
          set((state) => ({ theme }));
        },
        setShortcutVisible(value: boolean) {
          set((state) => ({ shortcutVisible: value }));
        },
        hasSeenIntroPopup: false,
        setSeenIntro() {
          set((state) => ({ hasSeenIntroPopup: true }));
        },
        getExportJson() {
          var s = get();
          var r: PlayerPrefExport = {
            favNodes: structuredClone(s.favNodes),
            nodesLastUsedDates: structuredClone(s.nodesLastUsedDates),
            nodesUseCount: structuredClone(s.nodesUseCount),
            nodeSorting: s.nodeSorting,
            palettes: structuredClone(s.palettes),
            gradient: structuredClone(s.gradient),
            colorPreset: structuredClone(s.colorPreset),
            hasSeenIntroPopup: s.hasSeenIntroPopup,
            snippets: structuredClone(s.snippets),
          };
          return r;
        },
        loadJson(saveData) {
          set((state) => ({
            favNodes: structuredClone(saveData.favNodes),
            nodesLastUsedDates: structuredClone(saveData.nodesLastUsedDates),
            nodesUseCount: structuredClone(saveData.nodesUseCount),
            nodeSorting: saveData.nodeSorting,
            palettes: structuredClone(saveData.palettes),
            gradient: structuredClone(saveData.gradient),
            colorPreset: structuredClone(saveData.colorPreset),
            hasSeenIntroPopup: saveData.hasSeenIntroPopup,
            snippets: structuredClone(saveData.snippets),
          }));
        },
        loadDefaultPaletteCollection() {
          set((state) => ({
            palettes: {
              ...state.palettes,
              ...structuredClone(DefaultPalettes),
            },
            gradient: {
              ...state.gradient,
              ...structuredClone(DefaultGradient),
            },
          }));
        },
        resetNodeUsageInformation() {
          set(() => ({ nodesLastUsedDates: {}, nodesUseCount: {} }));
        },
        removeDefaultPalettes() {
          set((state) => ({
            palettes: Object.fromEntries(Object.entries(state.palettes).filter(([name]) => !DefaultPalettes[name])),
            gradient: Object.fromEntries(Object.entries(state.gradient).filter(([name]) => !DefaultGradient[name])),
          }));
        },
      } as PlayerPrefStore;
    },
    {
      name: "node-painter-player-prefs", // name of the item in the storage (must be unique)
    }
  )
);
