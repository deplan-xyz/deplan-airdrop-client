import styles from './Circleloader.module.scss';

const CircleLoader = ({
  width = 'auto',
  height = 'auto'
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div className={styles.loader} style={{ width, height }}>
      <svg className={styles.circularLoader} viewBox="25 25 50 50">
        <circle
          className={styles.loaderPath}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#34DEDC"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default CircleLoader;
