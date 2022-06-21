import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './PriceAt.module.scss';

const PriceAt = () => {
  const [search, setSearch] = useSearchParams();

  const [inputPrice, setInputPrice] = useState({
    first: '',
    second: ''
  });

  // filter by onChange
  const handleChange = (e) => {
    const priceRange = e.target.value;

    if (priceRange === '') {
      search.delete('priceAt');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('priceAt', priceRange);
      setSearch(search, {
        replace: true
      });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputPrice((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  //filter by onClick
  const filter = () => {
    if (inputPrice.first === '' || inputPrice.second === '') {
      search.delete('priceAt');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('priceAt', `${inputPrice.first}to${inputPrice.second}`);
      setSearch(search, {
        replace: true
      });
    }
  };

  const filterOut = () => {
    search.delete('priceAt');
    setSearch(search, {
      replace: true
    });

    setInputPrice({
      first: '',
      second: ''
    });
  };

  return (
    <>
      <label className={styles.label}>price range</label>
      <select
        className={styles.select}
        value={search.get('priceAt') ? search.get('priceAt') : ''}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="01to50">01 to 50</option>
        <option value="51to100">51 to 100</option>
        <option value="101to200">101 to 200</option>
        <option value="201to500">201 to 500</option>
        <option value="501to1000">501 to 1000</option>
      </select>

      <div className={styles.input}>
        <input
          name="first"
          type="number"
          value={inputPrice.first}
          onChange={changeHandler}
        />
        <span>to</span>
        <input
          name="second"
          type="number"
          value={inputPrice.second}
          onChange={changeHandler}
        />
      </div>

      <div className={styles.btn}>
        <button onClick={filter}>filter</button>
        {search.get('priceAt') && (
          <button onClick={filterOut}>filter out</button>
        )}
      </div>
    </>
  );
};

export default PriceAt;
