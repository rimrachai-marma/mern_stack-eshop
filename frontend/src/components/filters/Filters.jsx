import styles from './Filters.module.scss';

import Brand from './Brand';
import InStock from './InStock';
import PriceAt from './PriceAt';
import Rating from './Rating';
import Sorting from './Sorting';

const Filters = () => {
  return (
    <div className={styles.filters}>
      <div className={styles['filter-group']}>
        <Sorting />
      </div>
      <div className={styles['filter-group']}>
        <Brand />
      </div>
      <div className={styles['filter-group']}>
        <Rating />
      </div>
      <div className={styles['filter-group']}>
        <PriceAt />
      </div>
      <div className={styles['filter-group']}>
        <InStock />
      </div>
    </div>
  );
};

export default Filters;
