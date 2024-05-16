import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useWallet from './useWallet';
import { checkIsuserFollowDePlanOnTwitter, followTwitter } from '../api/api';

const INTERVAL = 1000;
const TIMEOUT = 15000;

const useCheckTwitterFollow = () => {
    const [inProgress, setInProgress] = useState(false);

    const { address } = useWallet();
    const { data: followStatus, error, refetch } = useQuery({
        queryKey: ['twitterFollowStatus', address],
        enabled: !!address && inProgress,
        queryFn: async () => await checkIsuserFollowDePlanOnTwitter(address!).then((res) => {
            setInProgress(false);
            return res;
        }),
        retryDelay: INTERVAL,
        retry(failureCount, error) {
            if (error instanceof Error && error.message === 'Timeout' || failureCount * INTERVAL >= TIMEOUT) {
                setInProgress(false);
                return false;
            }

            return failureCount * INTERVAL < TIMEOUT;
        },
    });

    const startFollow = async () => {
        setInProgress(true);

        try {
            if (!address) {
                throw new Error('Wallet address is not available');
            }

            const url = await followTwitter(address!);

            return url;
        } catch (error) {
            console.error('Error following DePlan on Twitter', error);
            throw error;
        }
    };

    return {
        followStatus,
        isFinished: followStatus !== undefined,
        error,
        startFollow,
        inProgress,
        checkIsuserFollowDePlanOnTwitter: refetch,
    };
}

export default useCheckTwitterFollow