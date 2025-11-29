import { produce } from "immer";
import { create } from "zustand";
import { closeAllPopup, openCodeblockModal } from "../Actions/navigationAction";
import { CodeBlock } from "../Types/CodeBlock/CodeBlock";
import { CodeBlockStatement } from "../Types/CodeBlock/CodeBlockStatement";
import { PortDefinition } from "../Types/PortDefinition";
import { createDefaultCodeBlock } from "../Utils/codeblock/createDefaultCodeBlock";

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

      openCodeblockModal();
    },
    close: () => {
      //save the image to the node
      const cb = get().callback;
      if (cb) {
        cb(get().current);
      }
      closeAllPopup();
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
