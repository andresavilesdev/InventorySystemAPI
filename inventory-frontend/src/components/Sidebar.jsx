import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Productos' },
  { to: '/products/new', icon: Plus, label: 'Nuevo Producto' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-surface/80 p-2 backdrop-blur-sm lg:hidden"
      >
        <Menu size={20} className="text-primary" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-surface/60 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Package size={18} className="text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Inventory
            </span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={18} className="text-text-muted" />
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-1 px-3">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-l-2 border-primary bg-primary/5 text-primary'
                    : 'text-text-muted hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon
                size={18}
                className="transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.4)]"
              />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border px-6 py-4">
          <p className="text-xs text-text-muted">
            © 2026 InventorySystem
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Desarrollado por{' '}
            <a
              href="https://github.com/andresavilesdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-primary/80"
            >
              andresdev
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
