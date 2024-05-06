import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="50"
      height="35"
      viewBox="-10 0 50 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M25.248 3.993h-0.928c-0.442 0-0.8 0.358-0.801 0.8v14.016c0.005 0.093 0.007 0.203 0.007 0.313 0 1.843-0.748 3.51-1.956 4.717l-0 0c-1.347 1.198-3.131 1.929-5.086 1.929-0.17 0-0.339-0.006-0.507-0.016l0.023 0.001c-0.145 0.010-0.313 0.015-0.483 0.015-1.954 0-3.738-0.732-5.092-1.936l0.008 0.007c-1.211-1.206-1.96-2.874-1.96-4.717 0-0.11 0.003-0.219 0.008-0.327l-0.001 0.015v-14.016c-0-0.442-0.358-0.8-0.8-0.8h-0.928c-0.442 0-0.8 0.358-0.8 0.8v14.049c-0.003 0.084-0.004 0.182-0.004 0.281 0 2.536 1.028 4.832 2.689 6.494l-0-0c1.785 1.66 4.185 2.679 6.823 2.679 0.19 0 0.379-0.005 0.566-0.016l-0.026 0.001c0.166 0.010 0.361 0.015 0.557 0.015 2.64 0 5.041-1.020 6.832-2.687l-0.006 0.006c1.651-1.666 2.67-3.959 2.67-6.491 0-0.099-0.002-0.198-0.005-0.297l0 0.014v-14.049c-0.001-0.442-0.359-0.8-0.801-0.8v0z"></path>
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
