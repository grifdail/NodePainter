import { create } from "zustand";
import { CodeBlock, createDefaultCodeBlock } from "../Types/CodeBlock";
import { Routes } from "../Types/Routes";
import { useRouter } from "./useRouter";

export type CodeBlockModalStore = {
  callback: ((newValue: any) => void) | null;
  current: CodeBlock;
  open: (current: CodeBlock, callback: (newValue: any) => void) => void;
  close: () => void;
};

export const useCodeBlockModal = create<CodeBlockModalStore>()((set, get) => {
  return {
    callback: null,
    current: createDefaultCodeBlock(),
    open(current, callback) {
      set({ callback: callback, current });

      useRouter.getState().open(Routes.CodeBlock);
    },
    close: () => {
      //save the image to the node
      useRouter.getState().close();
    },
  };
});
