import ClaimButton from '../ClaimButton';
import ClaimPeriod from '../ClaimPeriod';
import EligibilityInfo from '../EligibilityInfo';
import ParticipationConditions from '../ParticipationConditions';

import styles from './InfoCard.module.scss';

export const InfoCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.rightColumn}>
        <EligibilityInfo />
        <ClaimPeriod />
      </div>
      <div>
        <div className={styles.divider} />
      </div>
      <div>
        <ParticipationConditions />
        <ClaimButton />
      </div>
    </div>
  );
};
