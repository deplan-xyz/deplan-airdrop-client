import { FC } from 'react'

interface LogInWithWalletButtonProps {
    size?: "sm" | "md" | "mdl"
}

const LogInWithWalletButton: FC<LogInWithWalletButtonProps> = ({ size = 'md' }) => {
    return (
        <w3m-button size={size} balance="hide" />
    )
}

export default LogInWithWalletButton