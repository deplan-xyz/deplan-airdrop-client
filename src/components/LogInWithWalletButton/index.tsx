import { FC } from 'react';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/solana/react';

import styles from './LoginWithWalletButton.module.scss';
interface LogInWithWalletButtonProps {
  size?: 'sm' | 'md' | 'mdl';
  mode?: 'connect' | 'disconnect';
}

const CustomConnectButton: FC = () => {
  const { open } = useWeb3Modal();
  const { open: isOpened } = useWeb3ModalState();

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
