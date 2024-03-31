import { useQuery } from '@tanstack/react-query';
import { fetchEligibilityInfo } from '../api/api';
import { EligibilityData } from '../api/types';

const useEligibility = () => {
    const { data: eligibilityData, isError, isLoading, isFetching } = useQuery<EligibilityData>({ queryKey: ['eligibility'], queryFn: fetchEligibilityInfo });
    return {
        eligibilityInfo: eligibilityData,
        isError,
        isLoading: isLoading || isFetching,
    };
};

export default useEligibility