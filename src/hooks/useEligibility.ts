import { useQuery } from '@tanstack/react-query';
import { fetchClaimData } from '../api/api';
import { ClaimData } from '../api/types';
import useWallet from './useWallet';

const LAMPORDS = 1_000_000;

const useEligibility = () => {
    const { address } = useWallet();
    const { data: eligibilityData, isError, isLoading, isFetching, refetch: refetchClaimData } =
        useQuery<ClaimData>({
            queryKey: ['eligibility', address],
            enabled: !!address,
            queryFn: () => fetchClaimData(address!), staleTime: 0
        });

    const claimAmount = eligibilityData?.claimAmount ?? 0;

    return {
        isEligible: Math.round(claimAmount / LAMPORDS) >= 1,
        tokenAmount: claimAmount / LAMPORDS,
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
        refetchClaimData,
    };
};

export default useEligibility