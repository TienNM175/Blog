import { forwardRef } from 'react';
import styles from './loadMore.module.css';

export const LoadMore = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className={styles.loadMore} />;
});

LoadMore.displayName = 'LoadMore';