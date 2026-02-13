import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  BarChart3,
  Search,
  Shield,
  Zap,
  ArrowRight,
  Download,
  Upload,
  Tags,
  AlertTriangle,
  Layers,
  ChevronDown,
} from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Gestión de Productos',
    description: 'Crea, edita, duplica y elimina productos con una interfaz intuitiva y validaciones en tiempo real.',
    color: 'primary',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Inteligente',
    description: 'Visualiza KPIs clave: valor total del inventario, productos en stock bajo y categorías más populares.',
    color: 'success',
  },
  {
    icon: Search,
    title: 'Búsqueda y Filtros',
    description: 'Encuentra cualquier producto al instante con búsqueda en tiempo real, filtros por categoría y ordenamiento.',
    color: 'secondary',
  },
  {
    icon: AlertTriangle,
    title: 'Alertas de Stock',
    description: 'Recibe indicadores visuales automáticos cuando un producto tiene stock bajo o se ha agotado.',
    color: 'danger',
  },
  {
    icon: Download,
    title: 'Exportar a CSV',
    description: 'Descarga tu inventario completo en formato CSV para análisis externo o respaldo de datos.',
    color: 'primary',
  },
  {
    icon: Upload,
    title: 'Importar Datos',
    description: 'Carga productos masivamente desde archivos CSV para agilizar la configuración inicial.',
    color: 'secondary',
  },
];

const stats = [
  { label: 'Tiempo de respuesta', value: '<100ms', icon: Zap },
  { label: 'Operaciones CRUD', value: '5', icon: Layers },
  { label: 'Categorías ilimitadas', value: '∞', icon: Tags },
  { label: 'Datos protegidos', value: '100%', icon: Shield },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Package size={20} className="text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Inventory<span className="text-primary">System</span>
            </span>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-glow-cyan"
          >
            Ir al Dashboard <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-success/5 blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary"
          >
            <Zap size={12} /> Sistema de Inventario Moderno
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Controla tu inventario{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              sin esfuerzo
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Una plataforma elegante y poderosa para gestionar tus productos.
            Monitorea stock, analiza métricas y toma decisiones inteligentes
            con un sistema diseñado para la eficiencia.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/dashboard"
              className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-background transition-all hover:shadow-glow-cyan"
            >
              Comenzar ahora
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com/andresavilesdev/InventorySystemAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-medium text-text-muted transition-all hover:border-secondary/40 hover:text-secondary"
            >
              Ver en GitHub
            </a>
          </motion.div>

          {/* Floating cards preview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="relative mt-16"
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface/60 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-danger/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-text-muted">inventory-dashboard</span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="rounded-xl border border-border/50 bg-background/60 p-3 text-center"
                  >
                    <stat.icon size={16} className="mx-auto mb-1.5 text-primary" />
                    <p className="font-mono text-xl font-bold text-white">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Glow behind the card */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <ChevronDown size={20} className="mx-auto animate-bounce text-text-muted/40" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Funcionalidades</span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Todo lo que necesitas para{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                gestionar tu inventario
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted">
              Herramientas potentes con una interfaz minimalista para que te
              concentres en lo que importa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const colorStyles = {
                primary: 'group-hover:border-primary/30 group-hover:shadow-glow-cyan',
                success: 'group-hover:border-success/30 group-hover:shadow-glow-green',
                secondary: 'group-hover:border-secondary/30 group-hover:shadow-glow-purple',
                danger: 'group-hover:border-danger/30 group-hover:shadow-glow-red',
              };
              const iconBg = {
                primary: 'bg-primary/10 text-primary',
                success: 'bg-success/10 text-success',
                secondary: 'bg-secondary/10 text-secondary',
                danger: 'bg-danger/10 text-danger',
              };
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`group rounded-xl border border-border bg-surface/40 p-6 transition-all duration-300 ${colorStyles[feature.color]}`}
                >
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ${iconBg[feature.color]}`}>
                    <feature.icon size={20} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Cómo funciona</span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Simple, rápido y{' '}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                efectivo
              </span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Agrega tus productos',
                desc: 'Registra nombre, precio, categoría y stock. Importa masivamente desde CSV si ya tienes datos.',
              },
              {
                step: '02',
                title: 'Monitorea en tiempo real',
                desc: 'El dashboard te muestra métricas clave, alertas de stock bajo y las categorías más relevantes.',
              },
              {
                step: '03',
                title: 'Toma decisiones',
                desc: 'Con datos claros y organizados, optimiza tu inventario, previene quiebres de stock y maximiza ventas.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex gap-6 py-8"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-sm font-bold text-primary">
                    {item.step}
                  </span>
                  {i < 2 && <div className="mt-2 h-full w-px bg-gradient-to-b from-border to-transparent" />}
                </div>
                <div className="pb-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface/60 p-10 text-center backdrop-blur-sm sm:p-14"
        >
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/10 blur-[80px]" />

          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              ¿Listo para organizar tu inventario?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-text-muted">
              Empieza a gestionar tus productos de forma eficiente con una herramienta
              construida para simplificar tu trabajo.
            </p>
            <Link
              to="/dashboard"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-background transition-all hover:shadow-glow-cyan"
            >
              Ir al Dashboard
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-primary" />
            <span className="text-sm font-semibold text-white">InventorySystem</span>
          </div>
          <p className="text-xs text-text-muted">
            © 2026 Desarrollado por{' '}
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
      </footer>
    </div>
  );
}
