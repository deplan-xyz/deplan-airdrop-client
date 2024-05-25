import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWallet from './useWallet';

const useNavigationChange = (): void => {
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/airdrop', { replace: true });
    } else {
      navigate('/');
    }
  }, [isConnected]);
};

export default useNavigationChange;
