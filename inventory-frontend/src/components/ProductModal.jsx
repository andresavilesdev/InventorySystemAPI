import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const emptyForm = {
  productName: '',
  productDescription: '',
  productPrice: '',
  productCategory: '',
  productStock: '',
};

export default function ProductModal({ isOpen, onClose, onSubmit, product, isLoading }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const isEditing = !!product?.id;

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || '',
        productDescription: product.productDescription || '',
        productPrice: product.productPrice?.toString() || '',
        productCategory: product.productCategory || '',
        productStock: product.productStock?.toString() || '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [product, isOpen]);

  function validate() {
    const errs = {};
    if (!form.productName.trim()) errs.productName = 'El nombre es requerido';
    else if (form.productName.length > 100) errs.productName = 'Máximo 100 caracteres';

    if (form.productDescription.length > 300) errs.productDescription = 'Máximo 300 caracteres';

    const price = parseFloat(form.productPrice);
    if (!form.productPrice || isNaN(price) || price <= 0) errs.productPrice = 'Precio debe ser mayor a 0';

    if (!form.productCategory.trim()) errs.productCategory = 'La categoría es requerida';

    const stock = parseInt(form.productStock, 10);
    if (form.productStock === '' || isNaN(stock) || stock < 0) errs.productStock = 'Stock debe ser 0 o mayor';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      productName: form.productName.trim(),
      productDescription: form.productDescription.trim() || null,
      productPrice: parseFloat(parseFloat(form.productPrice).toFixed(2)),
      productCategory: form.productCategory.trim(),
      productStock: parseInt(form.productStock, 10),
    });
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                label="Nombre del producto"
                value={form.productName}
                onChange={(v) => handleChange('productName', v)}
                error={errors.productName}
                placeholder="Ej: Laptop Dell XPS 15"
                required
              />
              <Field
                label="Descripción"
                value={form.productDescription}
                onChange={(v) => handleChange('productDescription', v)}
                error={errors.productDescription}
                placeholder="Descripción del producto (opcional)"
                textarea
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Precio (USD)"
                  value={form.productPrice}
                  onChange={(v) => handleChange('productPrice', v)}
                  error={errors.productPrice}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                />
                <Field
                  label="Stock"
                  value={form.productStock}
                  onChange={(v) => handleChange('productStock', v)}
                  error={errors.productStock}
                  placeholder="0"
                  type="number"
                  min="0"
                  required
                />
              </div>
              <Field
                label="Categoría"
                value={form.productCategory}
                onChange={(v) => handleChange('productCategory', v)}
                error={errors.productCategory}
                placeholder="Ej: Electrónica"
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-primary/90 px-4 py-2.5 text-sm font-semibold text-background transition-all hover:bg-primary hover:shadow-glow-cyan disabled:opacity-50"
                >
                  {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, error, textarea, ...props }) {
  const Component = textarea ? 'textarea' : 'input';
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-muted">{label}</label>
      <Component
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-text-muted/50 focus:border-primary focus:shadow-[0_0_0_1px_rgba(0,245,255,0.3)] ${
          error ? 'border-danger' : 'border-border'
        } ${textarea ? 'h-20 resize-none' : ''}`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-1 text-xs text-danger"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
