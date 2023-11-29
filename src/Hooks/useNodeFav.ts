import { create } from "zustand";
import { produce } from "immer";

import { persist } from "zustand/middleware";

export type NodeFavStore = {
  fav: string[];
  lastUsed: { [key: string]: number };
  useNode: (id: string) => void;
  toggleFav: (id: string) => void;
};

export const useNodeFav = create<NodeFavStore>()(
  persist(
    (set, get) => {
      return {
        fav: [],
        lastUsed: {},
        useNode(node) {
          set(
            produce((state) => {
              state.lastUsed[node] = Date.now();
            })
          );
        },
        toggleFav(node) {
          set(
            produce((state) => {
              if (state.fav.includes(node) >= 1) {
                state.fav = state.fav.filter((id: string) => id !== node);
              } else {
                state.fav.push(node);
              }
            })
          );
        },
      } as NodeFavStore;
    },
    {
      name: "node-painter-favs", // name of the item in the storage (must be unique)
    }
  )
);
