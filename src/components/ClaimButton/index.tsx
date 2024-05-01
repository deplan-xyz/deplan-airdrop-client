
import { Transaction } from '@solana/web3.js';
import { useWeb3ModalProvider } from '@web3modal/solana/react';
import { claim, claimSend } from '../../api/api';
import useEligibility from '../../hooks/useEligibility';
import useWallet from '../../hooks/useWallet';
import styles from './ClaimButton.module.scss';


const ClaimButton = () => {
    const { address } = useWallet();
    const { tokenAmount, isEligible } = useEligibility();
    const { walletProvider, connection } = useWeb3ModalProvider();
    const isDisabled = false;

    if (!isEligible) {
        return null;
    }

    const onClaim = async () => {
        try {
            if (!address) {
                alert('Please connect your wallet');
                throw new Error('No address');
            }

            if (!walletProvider) {
                alert('Please connect your wallet');
                throw new Error('No wallet provider');
            }

            if (!connection) {
                alert('Please connect your wallet');
                throw new Error('No connection');
            }


            const transaction = await claim(address);

            const signedTxn = await walletProvider.signTransaction(transaction)
            .catch((error: unknown) => {
                console.error('Error signing transaction', error);
            });
            
            await claimSend(address, (signedTxn as Transaction).serialize().toString('base64'));

        } catch (error) {
            console.error('Error claiming', error);
        }

    };

    return isDisabled ?
        <div className={`${styles.button} ${styles.disabled}`}><span>Claim {tokenAmount.toLocaleString()} $DPLN</span></div> :
        <button onClick={onClaim} className={`${styles.button} ${styles.active}`}>Claim {tokenAmount.toLocaleString()} $DPLN</button>
}

export default ClaimButton