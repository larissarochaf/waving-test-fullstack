'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  products: Product[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('http://localhost:3001/orders');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setOrders(data);
      } catch {
        toast.error('Erro ao buscar os pedidos 😥');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Pedidos Realizados</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">Nenhum pedido encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-[#2A2C4A] p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Pedido #{order.id.slice(0, 6)}</h2>
                <span className="text-sm text-gray-400">
                  {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>

              <ul className="mb-2 space-y-1">
                {order.products.map((product, index) => (
                  <li key={index} className="text-sm text-gray-200">
                    {product.quantity}x {product.name} - R$ {product.price.toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-400">
                  Total: R$ {order.total.toFixed(2)}
                </span>
                <span className="text-xs bg-white text-[#0B0E33] px-2 py-1 rounded font-bold">
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
