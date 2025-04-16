'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedAdminEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();

      const adminData = JSON.stringify({ email: data.email });

      if (remember) {
        localStorage.setItem('admin-auth', adminData);
        localStorage.setItem('rememberedAdminEmail', data.email);
      } else {
        sessionStorage.setItem('admin-auth', adminData);
        localStorage.removeItem('rememberedAdminEmail');
      }

      toast.success('Login administrativo realizado com sucesso! 🔐');
      router.push('/admin/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Erro no login');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0E33] p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-gray-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[#0B0E33]">
          Acesso Administrativo
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="mr-2 cursor-pointer accent-purple-600"
          />
          <label htmlFor="remember" className="text-sm cursor-pointer select-none">
            Lembrar de mim
          </label>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}