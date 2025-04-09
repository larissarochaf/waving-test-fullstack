import { api } from '@/lib/api';
import { Product } from '@/types/product';

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return null;
  }
}
