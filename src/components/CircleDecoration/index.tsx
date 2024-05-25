import { FC } from 'react';

import styles from './CircleDecoration.module.scss';

interface CircleDecorationProps {
  children?: React.ReactNode;
}

export const CircleDecoration: FC<CircleDecorationProps> = ({ children }) => {
  return (
    <div className={styles.center}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
