import { useBackendStatus } from '../context/BackendContext';
import { WifiOff, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function OfflineBanner() {
  const { isOnline } = useBackendStatus();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline !== false || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative border-b border-warning/20 bg-warning/5 px-4 py-3 text-center"
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2 text-sm">
          <WifiOff size={15} className="text-warning" />
          <span className="text-warning/90">
            <strong>Modo sin conexión</strong> — Este proyecto prioriza funcionalidades backend.
          </span>
          <a
            href="https://github.com/andresavilesdev/InventorySystemAPI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
          >
            Ver repositorio <ExternalLink size={12} />
          </a>
          <span className="text-warning/70">
            — Los datos se guardan localmente y se perderán al limpiar el navegador.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-warning/50 transition-colors hover:text-warning"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
