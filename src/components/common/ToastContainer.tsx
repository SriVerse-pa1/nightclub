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
          success: <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-[#805536] shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[#805536] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#805536] shrink-0" />,
        };

        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#DCD1C0] text-[#29251F] text-xs shadow-card-hover transition-all"
          >
            <div className="flex items-center gap-2.5">
              {icons[t.type]}
              <span className="leading-snug font-medium">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3] p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
