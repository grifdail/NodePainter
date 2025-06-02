import { produce } from "immer";
import { create } from "zustand";

import { persist } from "zustand/middleware";
import { DefaultPalettes } from "../Data/Palettes";
import { PlayerPrefStore, SortingType } from "../Types/PlayerPrefStore";
import { ColorPalette, Gradient } from "../Types/vectorDataType";
import { Snippet } from "../Utils/snippets";

export const usePlayerPref = create<PlayerPrefStore>()(
  persist(
    (set, get) => {
      return {
        favNodes: [],
        nodesLastUsedDates: {},
        nodesUseCount: {},
        nodeSorting: "featured",
        palettes: {},
        gradient: {},
        snippets: {},
        colorPreset: DefaultPalettes.Pico8,
        setSorting(sorting: SortingType) {
          set({ nodeSorting: sorting });
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
        hasSeenIntroPopup: false,
        setSeenIntro() {
          set((state) => ({ hasSeenIntroPopup: true }));
        },
      } as PlayerPrefStore;
    },
    {
      name: "node-painter-player-prefs", // name of the item in the storage (must be unique)
    }
  )
);
