import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProduct } from '../hooks/useProducts';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NewProduct() {
  const navigate = useNavigate();
  const createMutation = useCreateProduct();

  const [form, setForm] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
    productStock: '',
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.productName.trim()) errs.productName = 'Requerido';
    else if (form.productName.length > 100) errs.productName = 'Máximo 100 caracteres';
    if (form.productDescription.length > 300) errs.productDescription = 'Máximo 300 caracteres';
    const price = parseFloat(form.productPrice);
    if (!form.productPrice || isNaN(price) || price <= 0) errs.productPrice = 'Debe ser mayor a 0';
    if (!form.productCategory.trim()) errs.productCategory = 'Requerido';
    const stock = parseInt(form.productStock, 10);
    if (form.productStock === '' || isNaN(stock) || stock < 0) errs.productStock = 'Debe ser 0 o mayor';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    createMutation.mutate(
      {
        productName: form.productName.trim(),
        productDescription: form.productDescription.trim() || null,
        productPrice: parseFloat(parseFloat(form.productPrice).toFixed(2)),
        productCategory: form.productCategory.trim(),
        productStock: parseInt(form.productStock, 10),
      },
      { onSuccess: () => navigate('/products') }
    );
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-xl"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm">
        <h1 className="mb-6 text-xl font-bold text-white">Crear Nuevo Producto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nombre del producto"
            value={form.productName}
            onChange={(v) => handleChange('productName', v)}
            error={errors.productName}
            placeholder="Ej: Laptop Dell XPS 15"
          />
          <InputField
            label="Descripción"
            value={form.productDescription}
            onChange={(v) => handleChange('productDescription', v)}
            error={errors.productDescription}
            placeholder="Descripción opcional"
            textarea
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Precio (USD)"
              value={form.productPrice}
              onChange={(v) => handleChange('productPrice', v)}
              error={errors.productPrice}
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0.01"
            />
            <InputField
              label="Stock"
              value={form.productStock}
              onChange={(v) => handleChange('productStock', v)}
              error={errors.productStock}
              placeholder="0"
              type="number"
              min="0"
            />
          </div>
          <InputField
            label="Categoría"
            value={form.productCategory}
            onChange={(v) => handleChange('productCategory', v)}
            error={errors.productCategory}
            placeholder="Ej: Electrónica"
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full rounded-xl bg-primary/90 py-3 text-sm font-semibold text-background transition-all hover:bg-primary hover:shadow-glow-cyan disabled:opacity-50"
          >
            {createMutation.isPending ? 'Creando...' : 'Crear Producto'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function InputField({ label, value, onChange, error, textarea, ...props }) {
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
