import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Moralis from 'moralis'

import router from './config/router'
import Web3ModalProvider from './providers/web3modal'
import ConnectDeplanAppDialog from './components/ConnectDeplanAppDialog';

import './index.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

(async () => {
  await Moralis.start({
    apiKey: import.meta.env.VITE_MORALIS_API_KEY,
  });
  console.log('Moralis initialized');
})()

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ConnectDeplanAppDialog />
      </QueryClientProvider>
    </Web3ModalProvider>
  </React.StrictMode>
);

