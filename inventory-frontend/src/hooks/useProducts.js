import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { useBackendStatus } from '../context/BackendContext';
import toast from 'react-hot-toast';

export function useProducts() {
  const { isOnline, products: localProducts } = useBackendStatus();

  const query = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: isOnline === true,
  });

  if (isOnline === false) {
    return { data: localProducts, isLoading: false, isError: false };
  }

  if (isOnline === null) {
    return { data: [], isLoading: true, isError: false };
  }

  return query;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { isOnline, addProduct } = useBackendStatus();

  return useMutation({
    mutationFn: (data) => {
      if (isOnline === false) return Promise.resolve(addProduct(data));
      return createProduct(data);
    },
    onSuccess: () => {
      if (isOnline === true) queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto creado exitosamente');
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { isOnline, editProduct } = useBackendStatus();

  return useMutation({
    mutationFn: ({ id, data }) => {
      if (isOnline === false) return Promise.resolve(editProduct(id, data));
      return updateProduct(id, data);
    },
    onSuccess: () => {
      if (isOnline === true) queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto actualizado exitosamente');
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { isOnline, removeProduct } = useBackendStatus();

  return useMutation({
    mutationFn: (id) => {
      if (isOnline === false) {
        removeProduct(id);
        return Promise.resolve('deleted');
      }
      return deleteProduct(id);
    },
    onSuccess: () => {
      if (isOnline === true) queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto eliminado exitosamente');
    },
    onError: (err) => toast.error(err.message),
  });
}
