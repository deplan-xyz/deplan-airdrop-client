import { FC, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import useWallet from '../../hooks/useWallet';
import { CheckTwitterFollowStatusResponse } from '../../api/types';
import { checkIsuserFollowDePlanOnTwitter } from '../../api/api';
import CircleLoader from '../CircleLoader';

import XLogo from './../../assets/twitterx.svg'

import styles from './TwitterFollowButton.module.scss';

interface TwitterFollowButtonProps {
    onConnect: () => void;
    loading: boolean;
}

const TwitterFollowButton: FC<TwitterFollowButtonProps> = ({ onConnect, loading }) => {
    const { address } = useWallet();
    const queryClient = useQueryClient();

    const isFollowingData = queryClient.getQueryData<CheckTwitterFollowStatusResponse>(['twitterFollowStatus', address]);


    useEffect(() => {
        if (!address) return;
        (async () => {
            const _isFollowing = await checkIsuserFollowDePlanOnTwitter(address);

            queryClient.setQueryData(['twitterFollowStatus', address], _isFollowing);
        })()
    }, [address])

    const onClick = async () => {
        if (isFollowingData?.isFolowing) return;

        onConnect();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.describtion}><span>Connect and Follow DePlan on your Twitter account</span></div>
            {loading ?
                <div className={styles.buttonLoading}><CircleLoader width='20px' height='20px' /></div> :
                <button
                    className={`${styles.button} ${isFollowingData?.isFolowing ? styles.buttonFollowing : ''}`}
                    onClick={onClick}>{isFollowingData?.isFolowing ?
                        <span className={styles.checkmark} /> :
                        <div className={styles.connectText}><img src={XLogo} width={20} /> <span>Connect</span></div>}
                </button>}
        </div>
    )
}

export default TwitterFollowButton;