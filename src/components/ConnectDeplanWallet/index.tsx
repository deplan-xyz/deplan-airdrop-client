import { FC, useEffect } from 'react';

import { connectDeplanWalletOrigin } from '../../constants/connect-deplan-wallet-frame-src';

import styles from './ConnectDeplanWallet.module.scss';
import { useDeplanWallet } from '../../hooks/useDeplanWalletAddress';

const ConnectDeplanWallet: FC = () => {
  const { deplanWallet, setWallet } = useDeplanWallet();

  const onToggle = () => {
    const dialog = document.getElementById(
      'connect-deplan-app'
    ) as HTMLDialogElement;
    if (!dialog || deplanWallet) {
      return;
    }

    const iframe = document.querySelector(
      '#deplan-iframe'
    ) as HTMLIFrameElement;

    if (dialog.open) {
      dialog.close();
      iframe?.contentWindow?.postMessage(
        { type: 'connect-deplan-modal-close' },
        '*'
      );
    } else {
      iframe?.contentWindow?.postMessage(
        { type: 'connect-deplan-modal-open' },
        '*'
      );
      dialog.showModal();
    }
  };

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

    setWallet(event.data.data);
  };

  const handleWcKey = (event: MessageEvent) => {
    if (event.data.type === 'wc-uri-received') {
      console.log('wc-uri-received', event.data.data);
      window.open(event.data.data, '_blank');

      return;
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleCloseMessage);
    window.addEventListener('message', handleAddressChangeMessage);
    window.addEventListener('message', handleWcKey);

    return () => {
      window.removeEventListener('message', handleCloseMessage);
      window.removeEventListener('message', handleAddressChangeMessage);
      window.removeEventListener('message', handleWcKey);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <button
          className={`${styles.connectButton} ${deplanWallet ? styles.connectButtonConnected : ''}`}
          onClick={onToggle}
        >
          {deplanWallet ? (
            <span className={styles.checkmark} title={deplanWallet} />
          ) : (
            <span>Open DePlan</span>
          )}
        </button>
      </div>
    </>
  );
};

export default ConnectDeplanWallet;
