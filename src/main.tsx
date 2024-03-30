import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Web3ModalProvider from './providers/web3modal'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <App />
    </Web3ModalProvider>
  </React.StrictMode>,
)
