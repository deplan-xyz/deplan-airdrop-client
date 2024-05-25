import { FC } from 'react';
import { solana } from '@web3modal/solana/chains';
import { createWeb3Modal, defaultSolanaConfig } from '@web3modal/solana/react';

const projectId = import.meta.env.VITE_CONNECT_WALLET_PRODUCT_ID as string;

const chains = [solana];

const metadata = {
  name: 'DePlan',
  description: 'DePlan connect wallet modal',
  url: 'https://airdrop.deplan.xyz',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const solanaConfig = defaultSolanaConfig({
  chains,
  projectId,
  metadata: metadata
});

createWeb3Modal({
  solanaConfig,
  projectId,
  metadata: metadata,
  allowUnsupportedChain: false,
  chains,
  enableAnalytics: false,
  themeVariables: {
    '--w3m-font-family': 'Instrument Sans, sans-serif',
    '--w3m-accent': '#34DEDC'
  },
  featuredWalletIds: [
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393'
  ],
  termsConditionsUrl: 'https://walletconnect.com/terms',
  privacyPolicyUrl: 'https://walletconnect.com/privacy'
});

interface Web3ModalProviderProps {
  children: React.ReactNode;
}

const Web3ModalProvider: FC<Web3ModalProviderProps> = ({ children }) => {
  return children;
};

export default Web3ModalProvider;
