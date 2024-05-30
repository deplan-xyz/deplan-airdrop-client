import { FC, useEffect, useRef, useState } from 'react';

import {
  connectDeplanWalletFrameSrc,
  connectDeplanWalletOrigin
} from '../../constants/connect-deplan-wallet-frame-src';
import styles from './ConnectDeplanAppDialog.module.scss';

import './ConnectDeplanAppDialog.module.scss';

const defaultIframeSize = { width: 300, height: 280 };

const ConnectDeplanAppDialog: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [iframeSize, setIframeSize] = useState(defaultIframeSize);

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== connectDeplanWalletOrigin) {
      return;
    }

    if (event.data.type === 'connect-deplan-modal-close') {
      dialogRef.current?.close();
      setIframeSize(defaultIframeSize);
      return;
    }

    if (event.data.type !== 'connect-deplan-modal-resize') {
      return;
    }

    const { data } = event.data;
    setIframeSize(data);
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <dialog ref={dialogRef} id="connect-deplan-app" className={styles.connectDeplanApp}>
        <iframe
          id="deplan-iframe"
          style={{
            width: `auto`,
            height: `${iframeSize.height}px`,
            border: 'none',
            background: 'transparent',
            borderRadius: 'clamp(0px, calc(4px * 9), 44px)'
          }}
          ref={iframeRef}
          src={connectDeplanWalletFrameSrc}
          title="DePlan"
        />
      </dialog>
      <iframe style={{ display: 'none' }} src={connectDeplanWalletFrameSrc} />
    </>
  );
};

export default ConnectDeplanAppDialog;
