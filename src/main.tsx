import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack'


import router from './config/router'
import Web3ModalProvider from './providers/web3modal'
import ConnectDeplanAppDialog from './components/ConnectDeplanAppDialog';

import './index.scss'
import { DeplanWalletProvider } from './hooks/useDeplanWalletAddress';
import { ElegibilityProvider } from './hooks/useEligibility';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider />
    <Web3ModalProvider>
      <QueryClientProvider client={queryClient}>
        <DeplanWalletProvider>
          <ElegibilityProvider>
            <RouterProvider router={router} />
          </ElegibilityProvider>
        </DeplanWalletProvider>
        <ConnectDeplanAppDialog />
      </QueryClientProvider>
    </Web3ModalProvider>
  </React.StrictMode>
);

