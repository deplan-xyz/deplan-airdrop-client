import { FC } from 'react'
import { solana } from '@web3modal/solana/chains'
import { createWeb3Modal, defaultSolanaConfig } from '@web3modal/solana/react'

const projectId = import.meta.env.VITE_CONNECT_WALLET_PRODUCT_ID as string

const chains = [solana]

const metadata = {
    name: 'DePlan',
    description: 'DePlan connect wallet modal',
    url: 'http://localhost:5173/',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const solanaConfig = defaultSolanaConfig({
    chains,
    projectId,
    metadata: metadata
});

const modal = createWeb3Modal({
    solanaConfig,
    projectId,
    metadata: metadata,
    chains,
    enableAnalytics: false,
    themeVariables: {
        "--w3m-font-family": "Instrument Sans, sans-serif",
        "--w3m-accent": "#34DEDC",
        "--w3m-border-radius-master": "8px",
        "--w3m-font-size-master": "12px",
    }
})

export const Web3Modal = modal;


interface Web3ModalProviderProps {
    children: React.ReactNode
}

const Web3ModalProvider: FC<Web3ModalProviderProps> = ({ children }) => {
    return children;
}

export default Web3ModalProvider