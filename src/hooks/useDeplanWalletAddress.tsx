import { createContext, useState, FC, useContext, ReactNode } from 'react';

interface DeplanWalletProviderProps {
  children: ReactNode;
}

const DeplanWalletContext = createContext({
  deplanWallet: '',
  setWallet: (wallet: string) => {
    console.log(wallet);
  }
});

export const DeplanWalletProvider: FC<DeplanWalletProviderProps> = ({
  children
}) => {
  const [_wallet, setWallet] = useState<string>('');

  return (
    <DeplanWalletContext.Provider value={{ deplanWallet: _wallet, setWallet }}>
      {children}
    </DeplanWalletContext.Provider>
  );
};

export const useDeplanWallet = () => {
  const context = useContext(DeplanWalletContext);
  if (!context) {
    throw new Error(
      'useDeplanWallet must be used within a DeplanWalletProvider'
    );
  }
  return context;
};
