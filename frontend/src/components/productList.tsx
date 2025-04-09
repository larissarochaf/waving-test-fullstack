'use client';

import { useProducts } from '@/lib/hooks/useAllProducts';
import ProductCard from './productCard';
import Loading from './loading';
import type { Product } from '@/types/product';

export default function ProductList() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao carregar os produtos.</p>;

  if (!data || data.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
