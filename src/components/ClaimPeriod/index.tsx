import { format } from 'date-fns/format';
import useEligibility from '../../hooks/useEligibility';
import style from './ClaimPeriod.module.scss';

const ClaimPeriod = () => {
  const { claimPeriod } = useEligibility();
  const from = format(new Date(claimPeriod.from), 'MMM d');
  const to = format(new Date(claimPeriod.to), 'MMM d, yyyy');
  return (
    <div>
      <div className={style.title}>
        {from} - {to} GMT
      </div>
      <div className={style.subtitle}>Claim period</div>
    </div>
  );
};

export default ClaimPeriod;
