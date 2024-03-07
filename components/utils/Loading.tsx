import styles from './loading.module.css';

type LoadingProps = {
  radius?: number;
  color?: string;
  speed?: GLfloat;
};

const Loading = ({
  radius = 35,
  color = '#5076f5',
  speed = 2,
}: LoadingProps) => {
  return (
    <div className={styles.loadingContainer}>
      <svg
        className={styles.loadingCircle}
        style={{
          width: `${radius}px`,
          height: `${radius}px`,
          animationDuration: `${speed}s`,
        }}
        viewBox='0 0 100 100'
      >
        <circle
          className={styles.path}
          style={{ stroke: color }}
          cx='50'
          cy='50'
          r='45'
        />
      </svg>
    </div>
  );
};

export default Loading;
