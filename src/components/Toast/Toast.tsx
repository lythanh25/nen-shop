import type { ToastItem, ToastType } from "../../hooks/useToast";

type ToastProps = {
  toast: ToastItem;
  onClose: (id: number) => void;
};

const toastStyles: Record<ToastType, string> = {
  success: "border-success/20 bg-background",
  error: "border-error/20 bg-background",
  info: "border-border bg-background",
};

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  error: "!",
  info: "i",
};

export default function Toast({ toast, onClose }: ToastProps) {
  return (
    <div
      role="alert"
      className={`flex w-full max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${toastStyles[toast.type]}`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          toast.type === "success"
            ? "bg-success/10 text-success"
            : toast.type === "error"
              ? "bg-error/10 text-error"
              : "bg-surface text-secondary"
        }`}
      >
        {toastIcons[toast.type]}
      </span>

      <p className="flex-1 text-sm font-medium">{toast.message}</p>

      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-lg text-muted transition-colors hover:bg-surface hover:text-primary"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
