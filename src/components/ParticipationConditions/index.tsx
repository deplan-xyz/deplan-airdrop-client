import useCheckTwitterFollow from '../../hooks/useQueryLongpolling';
import ConnectDeplanWallet from '../ConnectDeplanWallet';
import TwitterFollowButton from '../TwitterFollowButton';
import styles from './ParticipationConditions.module.scss';

const TG_URL = 'https://t.me/+lb5j0kVrSyJiMTky'

const ParticipationConditions = () => {
    const { startFollow, inProgress } = useCheckTwitterFollow();

    const openLink = (url: string) => {
        window.open(url, '_blank')
    }

    const follow = async () => {
        try {
            const url = await startFollow();

            openLink(url);
        } catch (error) {
            console.error('Error getting Twitter auth URL', error);
        }
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}>Conditions to participate: </span>
            <span className={`${styles.text} ${styles.marginTop}`}>The more $DPLN tokens you have in your wallet and the longer you hold them (during Apr 1 - May 1, 2024 period ), the more $DPLN tokens will be dropped to your wallet.</span>
            <span className={styles.title}>Make sure you:</span>
            <ul className={styles.list}>
                <li className={styles.item}>Member <button onClick={() => openLink(TG_URL)} className={styles.linkButton}>TG DePlan Community</button></li>
                <li className={styles.item}>
                    You follow DePlan on X and posted "DePlan is the new plan" <br />
                    <TwitterFollowButton loading={inProgress} onConnect={follow} />
                </li>
                <li className={styles.item}>
                    You are using DePlan Browser with Pay-As-You-Go products <br />
                    <ConnectDeplanWallet />
                </li>
            </ul>
        </div >
    )
}

export default ParticipationConditions
