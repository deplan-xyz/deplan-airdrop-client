import { FC, useEffect, useState } from 'react'

import { connectDeplanWalletOrigin } from '../../constants/connect-deplan-wallet-frame-src';

import styles from './ConnectDeplanWallet.module.scss'

const ConnectDeplanWallet: FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const onToggle = () => {
        const dialog = document.getElementById('connect-deplan-app') as HTMLDialogElement;
        if (!dialog || walletAddress) {
            return;
        }

        const iframe = document.querySelector('#deplan-iframe') as HTMLIFrameElement;

        if (dialog.open) {
            dialog.close();
            iframe?.contentWindow?.postMessage({ type: 'connect-deplan-modal-close' }, '*');
        }
        else {
            iframe?.contentWindow?.postMessage({ type: 'connect-deplan-modal-open' }, '*');
            dialog.showModal();
        }
    }

    const handleCloseMessage = (event: MessageEvent) => {
        if (event.origin !== connectDeplanWalletOrigin) {
            return;
        }


    };

    const handleAddressChangeMessage = (event: MessageEvent) => {
        if (event.origin !== connectDeplanWalletOrigin) {
            return;
        }

        if (event.data.type !== 'adress-update') {
            return;
        }

        setWalletAddress(event.data.data);
    }


    useEffect(() => {
        window.addEventListener('message', handleCloseMessage);
        window.addEventListener('message', handleAddressChangeMessage);

        return () => {
            window.removeEventListener('message', handleCloseMessage);
            window.removeEventListener('message', handleAddressChangeMessage);
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                <button
                    className={`${styles.connectButton} ${walletAddress ? styles.connectButtonConnected : ''}`}
                    onClick={onToggle}>{walletAddress ?
                        <span className={styles.checkmark} title={walletAddress} /> :
                        <span>Open DePlan</span>}
                </button>
            </div>
        </>
    )
}

export default ConnectDeplanWallet