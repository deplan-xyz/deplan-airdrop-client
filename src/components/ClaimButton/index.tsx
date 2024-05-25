
import { useState } from 'react';
import { Transaction } from '@solana/web3.js';
import { enqueueSnackbar } from 'notistack'
import { useWeb3ModalProvider } from '@web3modal/solana/react';

import { claim, claimSend } from '../../api/api';
import useEligibility from '../../hooks/useEligibility';
import useWallet from '../../hooks/useWallet';

import { useDeplanWallet } from '../../hooks/useDeplanWalletAddress';
import styles from './ClaimButton.module.scss';


const ClaimButton = () => {
    const [loading, setLoading] = useState(false);
    const { address } = useWallet();
    const { tokenAmount, isEligible, refetchClaimData } = useEligibility();
    const { walletProvider, connection } = useWeb3ModalProvider();
    const { deplanWallet } = useDeplanWallet();

    const onClaim = async () => {
        setLoading(true);
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

            console.log('address', address);
            console.log('deplanWallet', deplanWallet);

            const transaction = await claim(address, deplanWallet);

            const signedTxn = await walletProvider.signTransaction(transaction).catch(() => {
                enqueueSnackbar({ message: 'Transaction canceled by user', variant: 'error' });
            });

            if (!signedTxn) {
                throw new Error('No signed transaction');
            }

            await claimSend(address, (signedTxn as Transaction).serialize().toString('base64')).catch(() => {
                enqueueSnackbar({ message: 'Claim failed. Try again', variant: 'error', action: () => <button className={styles.retryTextButton} onClick={onClaim}>Retry</button> });
            });

            enqueueSnackbar({ message: `Successfully claimed ${tokenAmount.toLocaleString()} $DPLN`, variant: 'success' });
            refetchClaimData();

        } catch (error) {
            console.error('Error claiming', error);
            enqueueSnackbar({ message: 'Claim failed', variant: 'error' });
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className={styles.container}>
            <span className={styles.disclaimer}>Once claiming is available you'll be able to press button below to claim your $DPLN tokens</span>
            {
                !isEligible || loading ?
                    <div className={`${styles.button} ${styles.disabled}`}><span>Claim {tokenAmount.toLocaleString()} $DPLN</span></div> :
                    <button onClick={onClaim} className={`${styles.button} ${styles.active}`}>Claim {tokenAmount.toLocaleString()} $DPLN</button>
            }
        </div>
    )
}

export default ClaimButton