'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('E-mail ou senha inválidos');
      }

      const data = await response.json();

      const userData = JSON.stringify({ email: data.email, id: data.id });

      if (remember) {
        localStorage.setItem('rememberedEmail', data.email);
        localStorage.setItem('user-auth', userData);
      } else {
        sessionStorage.setItem('user-auth', userData);
        localStorage.removeItem('rememberedEmail');
      }

      toast.success('Login realizado com sucesso! 🚀');
      router.push('/products');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao fazer login');
      }
    }    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0E33] p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-gray-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[#0B0E33]">Acesse sua conta</h1>

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
