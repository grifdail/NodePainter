import { produce } from "immer";
import { create } from "zustand";
import { CodeBlock, CodeBlockStatement, createDefaultCodeBlock } from "../Types/CodeBlock";
import { PortDefinition } from "../Types/PortDefinition";
import { Routes } from "../Types/Routes";
import { useRouter } from "./useRouter";

export type CodeBlockModalStore = {
  setStatements: (statements: CodeBlockStatement[]) => void;
  setVariables: (newList: PortDefinition[], type: "input" | "output" | "local") => void;
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
      const cb = get().callback;
      if (cb) {
        cb(get().current);
      }
      useRouter.getState().close();
    },
    setVariables(newList, type) {
      set(
        produce((state) => {
          if (type === "local") {
            state.current.localVariables = newList;
          } else if (type === "input") {
            state.current.inputVariables = newList;
          } else if (type === "output") {
            state.current.outputVariables = newList;
          }
        })
      );
    },
    setStatements(statements) {
      set(
        produce((state) => {
          state.current.statements = statements;
        })
      );
    },
  };
});
