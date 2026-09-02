import { useEffect, useState } from "react";
import type { ToastItem, ToastType } from "../../hooks/useToast";

type ToastProps = {
  toast: ToastItem;
  onClose: (id: number) => void;
};

const toastStyles: Record<ToastType, string> = {
  success: "border-success/20 bg-success text-white",
  error: "border-error/20 bg-error text-white",
  info: "border-border bg-background text-primary",
};

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  error: "!",
  info: "i",
};

export default function Toast({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Start enter animation after the component has mounted
  useEffect(() => {
    const enterTimer = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      cancelAnimationFrame(enterTimer);
    };
  }, []);

  // Start exit animation after 2.2 seconds
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 2200);

    return () => {
      clearTimeout(exitTimer);
    };
  }, []);

  // Remove toast after exit animation finishes
  useEffect(() => {
    if (!isLeaving) {
      return;
    }

    const removeTimer = setTimeout(() => {
      onClose(toast.id);
    }, 300);

    return () => {
      clearTimeout(removeTimer);
    };
  }, [isLeaving, onClose, toast.id]);

  function handleClose() {
    setIsLeaving(true);
  }

  return (
    <div
      role="alert"
      className={`
        flex w-full max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-lg
        transition-all duration-300 ease-out
        ${toastStyles[toast.type]}
        ${
          isLeaving
            ? "translate-x-[120%] opacity-0"
            : isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-[120%] opacity-0"
        }
      `}
    >
      {/* Icon */}
      <span
        className={`
          flex h-6 w-6 shrink-0 items-center justify-center rounded-full
          text-xs font-bold
          ${
            toast.type === "success"
              ? "bg-white/20 text-white"
              : toast.type === "error"
                ? "bg-white/20 text-white"
                : "bg-surface text-secondary"
          }
        `}
      >
        {toastIcons[toast.type]}
      </span>

      {/* Message */}
      <p
        className={`flex-1 text-sm font-medium ${
          toast.type === "info" ? "text-primary" : "text-white"
        }`}
      >
        {toast.message}
      </p>

      {/* Close */}
      <button
        type="button"
        onClick={handleClose}
        className={`
          flex h-6 w-6 shrink-0 items-center justify-center rounded
          text-lg transition-colors
          ${
            toast.type === "info"
              ? "text-muted hover:bg-surface hover:text-primary"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }
        `}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
