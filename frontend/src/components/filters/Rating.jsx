import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Rating.module.scss';

const Rating = () => {
  const [search, setSearch] = useSearchParams();

  const handleChange = (event) => {
    const rating = event.target.value;
    if (rating === '') {
      search.delete('rating');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('rating', rating);
      setSearch(search, {
        replace: true
      });
    }
  };

  const filterOut = () => {
    search.delete('rating');
    setSearch(search, {
      replace: true
    });
  };

  return (
    <>
      <label className={styles.label}>avg. customer review</label>
      <select
        className={styles.select}
        value={search.get('rating') ? search.get('rating') : ''}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="$gte:1">1 or up</option>
        <option value="$gte:2">2 or up</option>
        <option value="$gte:3">3 or up</option>
        <option value="$gte:4">4 or up</option>
        <option value="$gte:5">5 or up</option>
      </select>

      <div className={styles.btn}>
        {search.get('rating') && (
          <button onClick={filterOut}>filter out</button>
        )}
      </div>
    </>
  );
};

export default Rating;
