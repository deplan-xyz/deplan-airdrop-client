import { FC, useEffect } from 'react';

import CircleLoader from '../CircleLoader';
import useCheckTwitterFollow from '../../hooks/useQueryLongpolling';

import XLogo from './../../assets/twitterx.svg';
import styles from './TwitterFollowButton.module.scss';

interface TwitterFollowButtonProps {
  onConnect: () => void;
  loading: boolean;
}

const TwitterFollowButton: FC<TwitterFollowButtonProps> = ({
  onConnect,
  loading
}) => {
  const { followStatus, checkIsuserFollowDePlanOnTwitter } =
    useCheckTwitterFollow();

  useEffect(() => {
    checkIsuserFollowDePlanOnTwitter();
  }, []);

  const onClick = async () => {
    if (followStatus?.isFollowing) return;

    onConnect();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.describtion}>
        <span>Connect and Follow DePlan on your Twitter account</span>
      </div>
      {loading ? (
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
