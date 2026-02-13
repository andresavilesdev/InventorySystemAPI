import { useState, useMemo, useRef } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import ConfirmDialog from '../components/ConfirmDialog';
import SearchBar from '../components/SearchBar';
import SkeletonTable from '../components/SkeletonTable';
import { exportToCSV, parseCSV } from '../utils/helpers';
import { Plus, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Products() {
  const { data: products = [], isLoading } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const fileInputRef = useRef(null);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.productCategory))].sort(),
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          (p.productDescription || '').toLowerCase().includes(q) ||
          p.productCategory.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((p) => p.productCategory === category);
    }

    const [field, dir] = sortBy.split('-');
    list.sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'name':
          cmp = a.productName.localeCompare(b.productName);
          break;
        case 'price':
          cmp = a.productPrice - b.productPrice;
          break;
        case 'stock':
          cmp = a.productStock - b.productStock;
          break;
        case 'date':
          cmp = new Date(a.createdAt) - new Date(b.createdAt);
          break;
      }
      return dir === 'desc' ? -cmp : cmp;
    });

    return list;
  }, [products, search, category, sortBy]);

  function handleCreate() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setModalOpen(true);
  }

  function handleDuplicate(product) {
    setEditingProduct({
      productName: product.productName + ' (copia)',
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      productStock: product.productStock,
    });
    setModalOpen(true);
  }

  function handleSubmit(data) {
    if (editingProduct?.id) {
      updateMutation.mutate(
        { id: editingProduct.id, data },
        { onSuccess: () => setModalOpen(false) }
      );
    } else {
      createMutation.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  }

  function handleDelete(product) {
    setDeleteTarget(product);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const items = parseCSV(ev.target.result);
        if (items.length === 0) {
          toast.error('CSV vacío o formato inválido');
          return;
        }
        let success = 0;
        for (const item of items) {
          try {
            await createMutation.mutateAsync(item);
            success++;
          } catch {
            // skip invalid items
          }
        }
        toast.success(`${success} de ${items.length} productos importados`);
      } catch {
        toast.error('Error al leer el archivo CSV');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="mt-0.5 text-sm text-text-muted">
            {filtered.length} de {products.length} productos
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportToCSV(products)}
            disabled={products.length === 0}
            className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-text-muted transition-all hover:border-primary/30 hover:text-primary disabled:opacity-40"
          >
            <Download size={15} /> Exportar
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-text-muted transition-all hover:border-secondary/30 hover:text-secondary"
          >
            <Upload size={15} /> Importar
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
          />
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-primary/90 px-4 py-2 text-sm font-semibold text-background transition-all hover:bg-primary hover:shadow-glow-cyan"
          >
            <Plus size={16} /> Nuevo
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />
      </motion.div>

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <ProductTable
          products={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        product={editingProduct}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro de eliminar "${deleteTarget?.productName}"? Esta acción no se puede deshacer.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
