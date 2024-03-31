import styles from './ParticipationConditions.module.scss';

const TG_URL = 'https://t.me/+lb5j0kVrSyJiMTky'
const TWITTER_URL = 'https://twitter.com/deplan_xyz'

const ParticipationConditions = () => {

    const openLink = (url: string) => {
        window.open(url, '_blank')
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}>Conditions to participate: </span>
            <span className={styles.text}>Hold at least 1 $DPLN token during Apr 1 - May 1, 2024 period. </span>
            <span className={`${styles.text} ${styles.marginTop}`}>The more DPLN tokens you have in your wallet and the loner you hold them (during Apr 1 - May 1, 2024 period ), the more DPLN tokens will be distributed to your wallet.</span>
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