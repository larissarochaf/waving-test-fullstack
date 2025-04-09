import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '@/types/product';

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get<Product[]>('http://localhost:3001/products');
      return response.data;
    },
  });
}

