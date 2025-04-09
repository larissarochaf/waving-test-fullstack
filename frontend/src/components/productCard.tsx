'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/cartContext';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);

    toast.success(`${product.name} foi adicionado ao carrinho 🛒`, {
      action: {
        label: 'Ver carrinho',
        onClick: () => router.push('/cart'),
      },
      duration: 3000,
    });
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="bg-[#f3e8ff] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white">{product.name}</h2>
          <p className="text-purple-600 font-semibold mb-4">
            R$ {product.price.toFixed(2)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </Link>
  );
}
