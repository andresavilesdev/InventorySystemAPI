import { motion } from 'framer-motion';
import { Pencil, Trash2, Copy, Sparkles } from 'lucide-react';
import { formatPrice, formatDate, isNewProduct, getStockBadge } from '../utils/helpers';

export default function ProductTable({ products, onEdit, onDelete, onDuplicate }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface/40 py-16">
        <div className="mb-4 text-6xl">📦</div>
        <p className="text-lg font-medium text-text-muted">No hay productos</p>
        <p className="mt-1 text-sm text-text-muted/60">Agrega tu primer producto para comenzar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface/40 backdrop-blur-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Producto</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Categoría</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Precio</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Stock</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Fecha</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const stockBadge = getStockBadge(product.productStock);
            return (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group border-b border-border/50 transition-colors duration-200 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="font-medium text-white">{product.productName}</p>
                      {product.productDescription && (
                        <p className="mt-0.5 max-w-xs truncate text-xs text-text-muted">
                          {product.productDescription}
                        </p>
                      )}
                    </div>
                    {isNewProduct(product.createdAt) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary shadow-glow-cyan">
                        <Sparkles size={10} /> NEW
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                    {product.productCategory}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-sm font-semibold text-white">
                  {formatPrice(product.productPrice)}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${stockBadge.bg} ${stockBadge.color} ${
                      product.productStock === 0 ? 'line-through opacity-60' : ''
                    } ${product.productStock > 0 && product.productStock < 10 ? 'pulse-danger' : ''}`}
                  >
                    {product.productStock} uds
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-text-muted">
                  {formatDate(product.createdAt)}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      onClick={() => onEdit(product)}
                      title="Editar"
                      className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDuplicate(product)}
                      title="Duplicar"
                      className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-secondary/10 hover:text-secondary"
                    >
                      <Copy size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      title="Eliminar"
                      className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-danger/10 hover:text-danger"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
