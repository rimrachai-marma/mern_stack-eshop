import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Sorting.module.scss';

const Sorting = () => {
  const [search, setSearch] = useSearchParams();

  const handleChange = (event) => {
    const sort = event.target.value;
    if (sort === '') {
      search.delete('sort');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('sort', sort);
      setSearch(search, {
        replace: true
      });
    }
  };

  return (
    <select
      className={styles.select}
      value={search.get('sort') ? search.get('sort') : ''}
      onChange={handleChange}
    >
      <option value="">Sort By</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="review-rank">Avg. Customer Review</option>
    </select>
  );
};

export default Sorting;
