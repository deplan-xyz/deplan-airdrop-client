import { FC, useEffect } from 'react';

import CircleLoader from '../CircleLoader';
import useCheckTwitterFollow from '../../hooks/useQueryLongpolling';

import XLogo from './../../assets/twitterx.svg';
import styles from './TwitterFollowButton.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { checkIsuserFollowDePlanOnTwitter } from '../../api/api';
import useWallet from '../../hooks/useWallet';

const TwitterFollowButton: FC = () => {
  const client = useQueryClient();
  const { address } = useWallet();
  const { followStatus } = useCheckTwitterFollow();
  const { startFollow, inProgress } = useCheckTwitterFollow();

  const openLink = (url: string) => {
    window.location.assign(url);
  };

  const follow = async () => {
    try {
      const url = await startFollow();

      openLink(url);
    } catch (error) {
      console.error('Error getting Twitter auth URL', error);
    }
  };

  const onClick = async () => {
    if (followStatus?.isFollowing) return;

    follow();
  };

  useEffect(() => {
    if (!address) return;

    checkIsuserFollowDePlanOnTwitter(address)
      .then(res => {
        console.log('Twitter follow status:', res);

        client.setQueryData(['twitterFollowStatus', address], res);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.describtion}>
        <span>Connect and Follow DePlan on your Twitter account</span>
      </div>
      {inProgress ? (
        <div className={styles.buttonLoading}>
          <CircleLoader width="20px" height="20px" />
        </div>
      ) : (
        <button
          className={`${styles.button} ${followStatus?.isFollowing ? styles.buttonFollowing : ''}`}
          onClick={onClick}
        >
          {followStatus?.isFollowing ? (
            <span className={styles.checkmark} />
          ) : (
            <div className={styles.connectText}>
              <img src={XLogo} alt="twitter-logo" width={20} />
              <span>Connect</span>
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default TwitterFollowButton;
