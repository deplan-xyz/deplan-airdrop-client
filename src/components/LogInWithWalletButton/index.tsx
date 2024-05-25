import { FC, useEffect } from 'react';
import {
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalEvents,
  useWeb3ModalProvider
} from '@web3modal/solana/react';

import styles from './LoginWithWalletButton.module.scss';
interface LogInWithWalletButtonProps {
  size?: 'sm' | 'md' | 'mdl';
  mode?: 'connect' | 'disconnect';
}

const CustomConnectButton: FC = () => {
  const { open } = useWeb3Modal();
  const { open: isOpened } = useWeb3ModalState();
  const events = useWeb3ModalEvents();
  const providerProps = useWeb3ModalProvider();

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  useEffect(() => {
    console.log('providerProps', providerProps);
  }, [providerProps]);

  const onConnect = async () => {
    await open();
  };

  return (
    <button
      disabled={isOpened}
      className={styles.connectButton}
      onClick={onConnect}
    >
      Connect Wallet
    </button>
  );
};

const LogInWithWalletButton: FC<LogInWithWalletButtonProps> = ({
  size = 'md',
  mode
}) => {
  return mode === 'connect' ? (
    <CustomConnectButton />
  ) : (
    <w3m-button size={size} balance="hide" />
  );
};

export default LogInWithWalletButton;
