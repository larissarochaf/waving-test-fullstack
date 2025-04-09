import ProductList from '@/components/productList';

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <ProductList />
    </main>
  );
}
