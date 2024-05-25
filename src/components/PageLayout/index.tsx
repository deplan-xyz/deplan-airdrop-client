import { Outlet } from 'react-router-dom';

import useNavigationChange from '../../hooks/useNavigatoinChange';

import styles from './PageLayout.module.scss';

const PageLayout = () => {
  useNavigationChange();

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default PageLayout;
