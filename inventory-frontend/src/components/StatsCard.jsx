import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, color = 'primary', delay = 0 }) {
  const colorMap = {
    primary: 'text-primary bg-primary/10 shadow-glow-cyan',
    secondary: 'text-secondary bg-secondary/10 shadow-glow-purple',
    success: 'text-success bg-success/10 shadow-glow-green',
    danger: 'text-danger bg-danger/10 shadow-glow-red',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-glow-cyan"
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            {label}
          </p>
          <p className="mt-0.5 text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
