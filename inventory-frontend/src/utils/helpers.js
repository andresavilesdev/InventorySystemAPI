export function formatPrice(price) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function isNewProduct(createdAt) {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = (now - created) / (1000 * 60 * 60 * 24);
  return diffDays < 7;
}

export function isLowStock(stock) {
  return stock > 0 && stock < 10;
}

export function isOutOfStock(stock) {
  return stock === 0;
}

export function getStockBadge(stock) {
  if (stock === 0) return { label: 'Sin stock', color: 'text-zinc-500', bg: 'bg-zinc-800' };
  if (stock < 10) return { label: 'Stock bajo', color: 'text-danger', bg: 'bg-danger/10' };
  return { label: 'En stock', color: 'text-success', bg: 'bg-success/10' };
}

export function exportToCSV(products) {
  const headers = ['ID', 'Nombre', 'Descripción', 'Precio', 'Categoría', 'Stock', 'Fecha de creación'];
  const rows = products.map((p) => [
    p.id,
    `"${p.productName}"`,
    `"${p.productDescription || ''}"`,
    p.productPrice,
    `"${p.productCategory}"`,
    p.productStock,
    p.createdAt,
  ]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `inventario_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const obj = {};
    headers.forEach((h, i) => {
      let val = (values[i] || '').replace(/^"|"$/g, '').trim();
      obj[h] = val;
    });
    return {
      productName: obj['Nombre'] || obj['productName'] || '',
      productDescription: obj['Descripción'] || obj['productDescription'] || '',
      productPrice: parseFloat(obj['Precio'] || obj['productPrice'] || 0),
      productCategory: obj['Categoría'] || obj['productCategory'] || '',
      productStock: parseInt(obj['Stock'] || obj['productStock'] || 0, 10),
    };
  });
}
