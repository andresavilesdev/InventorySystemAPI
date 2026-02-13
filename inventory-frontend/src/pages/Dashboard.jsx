import { Package, DollarSign, AlertTriangle, Tag } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import StatsCard from '../components/StatsCard';
import { formatPrice, isLowStock, isOutOfStock } from '../utils/helpers';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: products = [], isLoading } = useProducts();

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, p) => sum + p.productPrice * p.productStock,
    0
  );
  const lowStockCount = products.filter(
    (p) => isLowStock(p.productStock) || isOutOfStock(p.productStock)
  ).length;
  const categories = [...new Set(products.map((p) => p.productCategory))];

  const topCategories = categories
    .map((cat) => ({
      name: cat,
      count: products.filter((p) => p.productCategory === cat).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const lowStockProducts = products
    .filter((p) => isLowStock(p.productStock) || isOutOfStock(p.productStock))
    .sort((a, b) => a.productStock - b.productStock)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="skeleton h-64 rounded-xl" />
          <div className="skeleton h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-text-muted">
          Resumen de tu inventario
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Package}
          label="Total Productos"
          value={totalProducts}
          color="primary"
          delay={0}
        />
        <StatsCard
          icon={DollarSign}
          label="Valor del Inventario"
          value={formatPrice(totalValue)}
          color="success"
          delay={0.1}
        />
        <StatsCard
          icon={AlertTriangle}
          label="Stock Bajo"
          value={lowStockCount}
          color="danger"
          delay={0.2}
        />
        <StatsCard
          icon={Tag}
          label="Categorías"
          value={categories.length}
          color="secondary"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-surface/40 p-5"
        >
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Categorías populares
          </h3>
          {topCategories.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">Sin datos</p>
          ) : (
            <div className="space-y-3">
              {topCategories.map((cat) => {
                const pct = totalProducts > 0 ? (cat.count / totalProducts) * 100 : 0;
                return (
                  <div key={cat.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-white">{cat.name}</span>
                      <span className="text-text-muted">{cat.count} productos</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Low Stock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border bg-surface/40 p-5"
        >
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Alertas de stock
          </h3>
          {lowStockProducts.length === 0 ? (
            <div className="flex flex-col items-center py-8">
              <span className="text-3xl">✅</span>
              <p className="mt-2 text-sm text-text-muted">Todo en orden</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{p.productName}</p>
                    <p className="text-xs text-text-muted">{p.productCategory}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      p.productStock === 0
                        ? 'bg-zinc-800 text-zinc-400 line-through'
                        : 'bg-danger/10 text-danger pulse-danger'
                    }`}
                  >
                    {p.productStock} uds
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-muted transition-all hover:border-primary/30 hover:text-primary"
        >
          <Package size={16} />
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
}
