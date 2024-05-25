import useEligibility from '../../hooks/useEligibility';

import styles from './EligibilityInfo.module.scss';

const EligibleText = ({ tokens }: { tokens: number }) => {
  return (
    <div className={styles.eligibleText}>
      CONGRATS! You're Eligible for {tokens} $DPLN!
    </div>
  );
};

const NotEligibleText = () => {
  return (
    <div className={styles.notEligibleText}>
      Ooops....You’re not eligible for upcoming airdrop
    </div>
  );
};

const EligibilityInfo = () => {
  const { isEligible, tokenAmount, isLoading, isError } = useEligibility();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return isEligible ? (
    <EligibleText tokens={tokenAmount} />
  ) : (
    <NotEligibleText />
  );
};

export default EligibilityInfo;
