import { CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 left-4 sm:left-6 z-50 flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] sm:w-auto pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 bg-[#2C211B] text-[#FAF8F5] px-4 py-3 rounded-lg shadow-lg border border-[#B89352]/30 text-sm transition-all duration-200"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#B89352] shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#B89352] shrink-0" />
            )}
            <span className="leading-snug">{toast.text}</span>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="إغلاق الإشعار"
            className="text-[#FAF8F5]/70 hover:text-[#FAF8F5] p-1 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
