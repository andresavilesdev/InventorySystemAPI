import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function SearchBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-text-muted/50 focus:border-primary focus:shadow-[0_0_0_1px_rgba(0,245,255,0.3)]"
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none rounded-lg border border-border bg-surface/60 py-2.5 pl-9 pr-8 text-sm text-white outline-none transition-all focus:border-primary"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none rounded-lg border border-border bg-surface/60 py-2.5 pl-9 pr-8 text-sm text-white outline-none transition-all focus:border-primary"
        >
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
          <option value="price-asc">Precio ↑</option>
          <option value="price-desc">Precio ↓</option>
          <option value="stock-asc">Stock ↑</option>
          <option value="stock-desc">Stock ↓</option>
          <option value="date-desc">Más reciente</option>
          <option value="date-asc">Más antiguo</option>
        </select>
      </div>
    </div>
  );
}
