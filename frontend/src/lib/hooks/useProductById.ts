import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Product } from '@/types/product';

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      console.log('🛰️ Buscando produto com ID (hook useProduct):', id);
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: Boolean(id),
  });
}
