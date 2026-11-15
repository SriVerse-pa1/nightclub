import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 lg:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[#FFB547] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />,
        };

        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF] text-xs shadow-glow-card transition-all"
          >
            <div className="flex items-center gap-2.5">
              {icons[t.type]}
              <span className="leading-snug">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#A99CCB] hover:text-[#F3EEFF] p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
