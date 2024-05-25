import { useWeb3ModalAccount } from '@web3modal/solana/react';

const useWallet = () => {
  const { address, isConnected, currentChain } = useWeb3ModalAccount();

  return {
    address,
    isConnected,
    currentChain
  };
};

export default useWallet;
