import { Icon } from "@tabler/icons-react";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { InputProps } from "../Components/Generics/Inputs/InputProps";

export type DialogueButtonData = {
  key: any;
  label: string;
  icon?: Icon;
  style: "invisible" | "normal";
};

export type DialogFieldData = {
  key: string;
  label: string;
  defaultValue?: any;
  input: React.FC<InputProps<any>>;
  passTrough?: any;
  tooltip?: string;
};
export type DialogData = {
  header?: string;
  callback: (button: any, fieldResult: { [key: string]: any } | undefined) => void;
  buttons: DialogueButtonData[];
  text?: string;
  fields: DialogFieldData[];
  fieldResult?: { [key: string]: any };
  id?: string;
};

export type DialogStore = {
  openError(message?: string, callback?: () => void): unknown;
  dialogs: DialogData[];
  open: (dialog: DialogData) => void;
  close: (dialogId: string) => void;
  clickButton: (dialogId: string, button: any) => void;
  setField: (dialogId: string, field: string, newValue: any) => void;
  openConfirm: (callback: (isConfirmed: boolean) => void, header?: string, text?: string, textConfirm?: string, textCancel?: string) => void;
};

export const useDialog = create<DialogStore>()((set, get) => {
  return {
    dialogs: [],
    open(dialog) {
      if (dialog.id === undefined) {
        dialog.id = nanoid();
      }
      if (!dialog.fieldResult) {
        dialog.fieldResult = dialog.fields.reduce((old, v) => ({ ...old, [v.key]: v.defaultValue }), {});
      }
      set((state) => ({ dialogs: [...state.dialogs, dialog] }));
    },
    close(dialog) {
      set((state) => {
        return { dialogs: state.dialogs.filter((d) => d.id !== dialog) };
      });
    },
    clickButton(dialogId, button) {
      var d = get().dialogs.find((item) => item.id === dialogId);
      if (d) {
        d.callback(button, d.fieldResult);
      }
      get().close(dialogId);
    },
    setField(dialogId, field, newValue) {
      set(
        produce((state) => {
          for (let index = 0; index < state.dialogs.length; index++) {
            const element = state.dialogs[index] as DialogData;
            if (element.id === dialogId && element.fieldResult) {
              element.fieldResult[field] = newValue;
            }
          }
        })
      );
    },
    openConfirm(callback, header = "Confirm", text = "Are you sure?", textConfirm = "confirm", textCancel = "cancel") {
      var d: DialogData = {
        text: text,
        header: header,
        callback: (button: any, fieldResult: { [key: string]: any } | undefined) => {
          callback(button === "confirm");
        },
        buttons: [
          {
            key: "cancel",
            label: textCancel,
            style: "invisible",
          },
          {
            key: "confirm",
            label: textConfirm,
            style: "normal",
          },
        ],
        fields: [],
      };
      get().open(d);
    },
    openError(message: string = "Something went wrong", callback: () => void = () => {}) {
      var d: DialogData = {
        text: message,
        header: "Error",
        callback: (button: any, fieldResult: { [key: string]: any } | undefined) => {
          callback();
        },
        buttons: [
          {
            key: "confirm",
            label: "ok",
            style: "normal",
          },
        ],
        fields: [],
      };
      get().open(d);
    },
  };
});
