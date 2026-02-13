import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BackendContext = createContext();

export function useBackendStatus() {
  return useContext(BackendContext);
}

const STORAGE_KEY = 'inventory_offline_products';

function loadLocalProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

let nextId = Date.now();

export default function BackendProvider({ children }) {
  const [isOnline, setIsOnline] = useState(null); // null = checking
  const [products, setProducts] = useState([]);

  // Check backend availability
  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch('/api/v1/products', { method: 'GET', signal: AbortSignal.timeout(3000) });
        if (!cancelled) {
          if (res.ok) {
            setIsOnline(true);
          } else {
            setIsOnline(false);
            setProducts(loadLocalProducts());
          }
        }
      } catch {
        if (!cancelled) {
          setIsOnline(false);
          setProducts(loadLocalProducts());
        }
      }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  const getProducts = useCallback(() => products, [products]);

  const addProduct = useCallback((data) => {
    const newProduct = {
      ...data,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => {
      const updated = [...prev, newProduct];
      saveLocalProducts(updated);
      return updated;
    });
    return newProduct;
  }, []);

  const editProduct = useCallback((id, data) => {
    let result = null;
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          result = { ...p, ...data };
          return result;
        }
        return p;
      });
      saveLocalProducts(updated);
      return updated;
    });
    return result;
  }, []);

  const removeProduct = useCallback((id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveLocalProducts(updated);
      return updated;
    });
  }, []);

  return (
    <BackendContext.Provider
      value={{ isOnline, products, getProducts, addProduct, editProduct, removeProduct }}
    >
      {children}
    </BackendContext.Provider>
  );
}
