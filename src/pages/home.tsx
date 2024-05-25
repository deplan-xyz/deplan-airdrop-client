import LogInWithWalletButton from '../components/LogInWithWalletButton';

import Airdropslogo from './../assets/DePlan airdrops.svg';
import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <img src={Airdropslogo} width={220} height={220} alt="DePlan Airdrops" />
      <span className={styles.title}>Connect Solana Wallet</span>
      <span className={styles.description}>
        Connect your Solana wallet and check if you are eligible for $DPLN
        airdrop
      </span>
      <div className={styles.connectBtn}>
        <LogInWithWalletButton mode="connect" size="md" />
      </div>
    </div>
  );
};

export default Home;
