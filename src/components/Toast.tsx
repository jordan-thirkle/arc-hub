import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
const listeners: Set<(toast: ToastItem) => void> = new Set();

export function showToast(message: string, type: ToastType = 'info') {
  const toast: ToastItem = { id: ++toastId, message, type };
  listeners.forEach(fn => fn(toast));
}

export function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (toast: ToastItem) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const typeColors: Record<ToastType, string> = {
    success: 'border-accent bg-accent/10',
    error: 'border-danger bg-danger/10',
    info: 'border-[rgb(var(--border-primary))] bg-surface',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto px-3 py-2 border text-[10px] font-mono shadow-card ${typeColors[t.type]}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-primary">{t.message}</span>
              <button
                onClick={() => remove(t.id)}
                className="text-tertiary hover:text-primary ml-1"
              >
                &times;
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
