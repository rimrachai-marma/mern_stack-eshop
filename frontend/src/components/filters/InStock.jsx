import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './InStock.module.scss';

const InStock = () => {
  const [search, setSearch] = useSearchParams();

  const handleChange = (event) => {
    if (!event.target.checked) {
      search.delete('availableInStock');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('availableInStock', event.target.checked);
      setSearch(search, {
        replace: true
      });
    }
  };

  return (
    <>
      <label className={styles.label}>available in stock</label>
      <input
        className={styles.checkbox}
        onChange={handleChange}
        name="isAdmin"
        id="isAdmin"
        type="checkbox"
        checked={search.get('availableInStock')}
      />
    </>
  );
};

export default InStock;
