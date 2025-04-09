'use client';

import { useCart } from '@/contexts/cartContext';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;

  const handleConfirm = async () => {
    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar pedido');
      }

      toast.success('Pedido confirmado com sucesso! 🎉');
      clearCart();
      router.push('/');
    } catch (err) {
      toast.error('Erro ao confirmar pedido 😢');
      console.error(err);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center text-white">
        <h1 className="text-2xl font-bold mb-2">🛍️ Carrinho vazio!</h1>
        <p className="text-gray-400">Adicione produtos para finalizar sua compra.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <ul className="mb-6 space-y-3">
        {cart.map((item) => (
          <li
            key={item.id}
            className="bg-[#2A2C4A] border border-white/10 rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">Qtd: {item.quantity}</p>
            </div>
            <p className="font-semibold text-purple-300">
              R$ {(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mb-6">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold text-purple-400">R$ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded transition cursor-pointer"
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
