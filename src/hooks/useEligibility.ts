import { useQuery } from '@tanstack/react-query';
import { fetchEligibilityInfo } from '../api/api';
import { EligibilityData } from '../api/types';
import useWallet from './useWallet';

const useEligibility = () => {
    const { address } = useWallet();
    const { data: eligibilityData, isError, isLoading, isFetching } = useQuery<EligibilityData>({ queryKey: ['eligibility', address], enabled: !!address, queryFn: () => fetchEligibilityInfo(address!), staleTime: 0 });
    return {
        eligibilityInfo: eligibilityData,
        isError,
        isLoading: isLoading || isFetching,
    };
};

export default useEligibility