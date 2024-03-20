import { create } from "zustand";
import { produce } from "immer";

import { persist } from "zustand/middleware";
import { ColorPalette, Gradient } from "../Types/vectorDataType";
import { PlayerPrefStore } from "../Types/PlayerPrefStore";
import { SortingType } from "../Types/PlayerPrefStore";

export const usePlayerPref = create<PlayerPrefStore>()(
  persist(
    (set, get) => {
      return {
        favNodes: [],
        nodesLastUsedDates: {},
        nodesUseCount: {},
        nodeSorting: "name",
        palettes: {},
        gradient: {},
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
              delete state.palette[name];
            })
          );
        },
      } as PlayerPrefStore;
    },
    {
      name: "node-painter-player-prefs", // name of the item in the storage (must be unique)
    }
  )
);
