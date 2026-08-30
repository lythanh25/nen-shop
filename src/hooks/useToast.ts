import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastStore = {
  toasts: ToastItem[];

  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
};

export const useToast = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (message, type = "success") => {
    const id = Date.now();

    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          message,
          type,
        },
      ],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 2500);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
