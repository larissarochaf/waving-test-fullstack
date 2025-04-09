import { useCart } from '@/contexts/cartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">🛍️ Seu Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-gray-300 text-lg mt-6">Seu carrinho está vazio. 😢</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border border-white/10 bg-[#2A2C4A] p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-purple-300">R$ {item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">Quantidade: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-right">
            <p className="text-2xl font-bold text-purple-400">Total: R$ {total.toFixed(2)}</p>

            <div className="mt-6 flex justify-end gap-4 flex-wrap">
              <button
                onClick={clearCart}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                Limpar carrinho
              </button>

              <Link
                href="/checkout"
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
              >
                Confirmar Pedido
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
