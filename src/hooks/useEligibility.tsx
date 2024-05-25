import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useQuery } from '@tanstack/react-query';

import useWallet from './useWallet';
import useCheckTwitterFollow from './useQueryLongpolling';
import { ClaimData } from '../api/types';
import { fetchClaimData } from '../api/api';
import { useDeplanWallet } from './useDeplanWalletAddress';

const LAMPORDS = 1_000_000;

interface DeplanWalletProviderProps {
  children: ReactNode;
}

const ElegibilityContext = createContext({
  isEligible: false,
  tokenAmount: 0,
  claimPeriod: { from: 0, to: 0 },
  holdPeriod: { from: 0, to: 0 },
  isError: false,
  isLoading: false,
  canClaim: false,
  isClaimDone: false,
  refetchClaimData: () => {
    return;
  }
});

export const ElegibilityProvider: FC<DeplanWalletProviderProps> = ({
  children
}) => {
  const [isEligible, setIsEligible] = useState(false);
  const { address } = useWallet();
  const { deplanWallet } = useDeplanWallet();
  const { followStatus } = useCheckTwitterFollow();
  const {
    data: eligibilityData,
    isError,
    isLoading,
    isFetching,
    refetch: refetchClaimData
  } = useQuery<ClaimData>({
    queryKey: ['eligibility', address],
    enabled: !!address,
    queryFn: () => fetchClaimData(address!),
    staleTime: 0
  });

  const claimAmount = useMemo(
    () => eligibilityData?.claimAmount ?? 0,
    [eligibilityData]
  );

  useEffect(() => {
    if (claimAmount < 1) {
      setIsEligible(false);
      return;
    }

    setIsEligible(true);
  }, [claimAmount]);

  return (
    <ElegibilityContext.Provider
      value={{
        isEligible: isEligible && !isError,
        canClaim: !!deplanWallet && !!followStatus?.isFollowing && isEligible,
        isClaimDone: !!eligibilityData?.isClaim,
        tokenAmount: Math.round(claimAmount / LAMPORDS),
        claimPeriod: {
          from: (eligibilityData?.claimFromDate ?? 0) * 1000,
          to: (eligibilityData?.claimToDate ?? 0) * 1000
        },
        holdPeriod: {
          from: (eligibilityData?.holdFromDate ?? 0) * 1000,
          to: (eligibilityData?.holdToDate ?? 0) * 1000
        },
        isError,
        isLoading: isLoading || isFetching,
        refetchClaimData
      }}
    >
      {children}
    </ElegibilityContext.Provider>
  );
};

const useEligibility = () => {
  const context = useContext(ElegibilityContext);
  if (!context) {
    throw new Error('useEligibility must be used within a ElegibilityProvider');
  }
  return context;
};

export default useEligibility;
