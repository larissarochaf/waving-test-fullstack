import { GetServerSideProps } from 'next';
import { useProduct } from '@/lib/hooks/useProductById';
import { notFound } from 'next/navigation';
import Loading from '@/components/loading';
import { useCart } from '@/contexts/cartContext';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

interface ProductPageProps {
  id: string;
}

export default function ProductPage({ id }: ProductPageProps) {
  const { data: product, isLoading, error } = useProduct(id);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);

      toast.success(`${product.name} foi adicionado ao carrinho 🛒`, {
        action: {
          label: 'Ver carrinho',
          onClick: () => router.push('/cart'),
        },
        duration: 3000,
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 text-center mt-8">Erro ao carregar o produto.</div>;
  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-[#0A0D2D] text-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Image
          src={product.imageUrl ?? '/placeholder.png'} // Fallback se estiver undefined
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg object-cover w-full md:w-1/2"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4 text-gray-300">{product.description}</p>
          <p className="text-xl font-semibold text-purple-400 mb-6">
            R$ {product.price?.toFixed(2) ?? 'Preço indisponível'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition cursor-pointer text-sm sm:text-base"
            >
              Adicionar ao Carrinho
            </button>

            <Link
              href="/products"
              className="bg-white text-purple-600 hover:bg-purple-100 px-6 py-2 rounded-lg transition cursor-pointer text-sm sm:text-base text-center"
            >
              Voltar para Produtos
            </Link>

            <Link
              href="/cart"
              className="text-purple-400 hover:text-purple-300 underline text-sm sm:text-base flex items-center"
            >
              Ir para o Carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: { id },
  };
};
