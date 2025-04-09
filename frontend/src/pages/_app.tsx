import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { CartProvider } from '@/contexts/cartContext';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" richColors closeButton />
      </CartProvider>
    </QueryClientProvider>
  );
}
