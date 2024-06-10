import Header from '../components/Header';
import { InfoCard } from '../components/InfoCard';
import { CircleDecoration } from '../components/CircleDecoration';
import LogInWithWalletButton from '../components/LogInWithWalletButton';

import DeplanLogoSmall from './../assets/logoSmall.svg';
import DeplanCoinLogo from './../assets/DPLN_Coin logo.png';
import ParachuteBG from '../components/ParachuteBG';

import styles from './airdrop.module.scss';

const Airdrop = () => {
  return (
    <>
      <Header>
        <img src={DeplanLogoSmall} width={110} alt="Deplan Logo" />
        <LogInWithWalletButton />
      </Header>
      <CircleDecoration>
        <img src={DeplanCoinLogo} width={180} alt="Deplan logo" />
        <ParachuteBG />
      </CircleDecoration>
      <div className={styles.content}>
        <span className={styles.title}>Summer $DPLN Airdrop</span>
        <div className={styles.descriptionContainer}>
          <span className={styles.description}>
            Continue supporting DePlan early adopters and believers.
          </span>
        </div>
        <InfoCard />
      </div>
    </>
  );
};

export default Airdrop;
