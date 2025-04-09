import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('admin-auth');

      if (!auth) {
        router.replace('/admin/login');
      } else {
        try {
          const parsed = JSON.parse(auth);
          if (parsed.email) {
            setAdminEmail(parsed.email);
          } else {
            localStorage.removeItem('admin-auth');
            router.replace('/admin/login');
          }
        } catch {
          localStorage.removeItem('admin-auth');
          router.replace('/admin/login');
        }
      }

      setTimeout(() => setLoading(false), 100);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    router.push('/admin/login');
  };

  const goToOrders = () => {
    router.push('/admin/orders');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Carregando dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0B0E33]">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>

        <p className="text-gray-600 mb-4">Bem-vindo(a), <strong>{adminEmail}</strong>!</p>

        <div className="grid grid-cols-1 gap-6">
          <div
            onClick={goToOrders}
            className="p-4 border rounded-xl shadow text-center hover:shadow-md transition cursor-pointer"
          >
            <p className="text-xl font-semibold text-purple-600">📄 Ver Pedidos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
