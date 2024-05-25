import { FC } from 'react';

import { Web3Modal } from '../../providers/web3modal';

import styles from './LoginWithWalletButton.module.scss';
interface LogInWithWalletButtonProps {
  size?: 'sm' | 'md' | 'mdl';
  mode?: 'connect' | 'disconnect';
}

const CustomConnectButton: FC = () => {
  const onConnect = async () => {
    await Web3Modal.open();
    Web3Modal.setLoading(true);
  };

  return (
    <button
      disabled={Web3Modal.getState().open}
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
