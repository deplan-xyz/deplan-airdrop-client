import useEligibility from "../../hooks/useEligibility"

import styles from './EligibilityInfo.module.scss'

const EligibleText = ({ tokens }: { tokens: number }) => {
    return <div className={styles.eligibleText}>You're Eligible for {tokens.toLocaleString()} $DPLN!</div>
}

const NotEligibleText = () => {
    return <div className={styles.notEligibleText}>You're not eligible.</div>
}

const EligibilityInfo = () => {
    const { eligibilityInfo, isLoading } = useEligibility();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        !eligibilityInfo?.isEligible ?
            <EligibleText tokens={eligibilityInfo!.tokens} /> : <NotEligibleText />
    )
}

export default EligibilityInfo
