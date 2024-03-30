import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './config/router'
import Web3ModalProvider from './providers/web3modal'

import './index.scss'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <RouterProvider router={router} />
    </Web3ModalProvider>
  </React.StrictMode>
);

