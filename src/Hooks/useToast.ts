import { Icon, IconCheck, IconExclamationCircle, IconInfoCircle } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { create } from "zustand";

export type ToastData = {
  message: string;
  icon?: Icon;
  duration?: number;
  id: string;
  type?: "normal" | "success" | "error";
};

type ToastStore = {
  toasts: ToastData[];
  add(toast: ToastData): void;
  remove(toast: string): void;
};

export const useToast = create<ToastStore>()((set, get) => ({
  toasts: [],
  add(toast: ToastData) {
    console.log("hllll");
    set((state) => ({
      toasts: [...state.toasts, toast],
    }));
  },
  remove(toast: string) {
    set((state) => ({
      toasts: state.toasts.filter((item) => item.id !== toast),
    }));
  },
}));

export function toastInfo(message: string) {
  useToast.getState().add({
    message,
    icon: IconInfoCircle,
    duration: 5,
    type: "normal",
    id: nanoid(),
  });
}

export function toastSuccess(message: string) {
  useToast.getState().add({
    message,
    icon: IconCheck,
    duration: 5,
    type: "success",
    id: nanoid(),
  });
}
export function toastError(message: string) {
  useToast.getState().add({
    message,
    icon: IconExclamationCircle,
    duration: 5,
    type: "error",
    id: nanoid(),
  });
}
