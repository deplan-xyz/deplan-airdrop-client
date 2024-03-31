import useEligibility from "../../hooks/useEligibility"

import styles from './EligibilityInfo.module.scss'

const EligibleText = () => {
    return <div className={styles.eligibleText}> You're eligible for upcoming airdrop
    </div>
}

const NotEligibleText = () => {
    return <div className={styles.notEligibleText}>You’re not eligible for upcoming airdrop</div>
}

const EligibilityInfo = () => {
    const { eligibilityInfo, isLoading, isError } = useEligibility();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        eligibilityInfo?.isEligible ?
            <EligibleText /> : <NotEligibleText />
    )
}

export default EligibilityInfo
