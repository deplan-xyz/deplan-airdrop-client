import { format } from 'date-fns/format'

import useEligibility from '../../hooks/useEligibility';
import styles from './ParticipationConditions.module.scss';

const TG_URL = 'https://t.me/+lb5j0kVrSyJiMTky'
const TWITTER_URL = 'https://twitter.com/deplan_xyz'

const ParticipationConditions = () => {
    const { holdPeriod } = useEligibility();
    const from = format(new Date(holdPeriod.from), 'MMM d')
    const to = format(new Date(holdPeriod.to), 'MMM d, yyyy')

    const openLink = (url: string) => {
        window.open(url, '_blank')
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}>Conditions to participate: </span>
            <span className={`${styles.text} ${styles.marginTop}`}>The more $DPLN tokens you have in your wallet and the longer you hold them (during {from} - {to} period ), the more $DPLN tokens will be dropped to your wallet.</span>
            <span className={styles.title}>Make sure you:</span>
            <ul className={styles.list}>
                <li className={styles.item}>Member <button onClick={() => openLink(TG_URL)} className={styles.linkButton}>TG DePlan Community</button></li>
                <li className={styles.item}>Follow <button onClick={() => openLink(TWITTER_URL)} className={styles.linkButton}>DePlan on Twitter</button></li>
                <li className={styles.item}>Tweet "DePlan is the new plan"</li>
            </ul>
        </div >
    )
}

export default ParticipationConditions
