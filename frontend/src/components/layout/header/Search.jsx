import React, { useState } from 'react';

import styles from './Search.module.scss';

import { ReactComponent as SearchIcon } from '../../../assets/search-icon.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useSearchParams();

  const category = search.get('category') ? search.get('category') : '';

  const brands = search.get('brands') ? search.get('brands') : '';

  const availableInStock = search.get('availableInStock')
    ? search.get('availableInStock')
    : '';

  const rating = search.get('rating') ? search.get('rating') : '';

  const priceAt = search.get('priceAt') ? search.get('priceAt') : '';

  let filter = false;

  if (brands || category || availableInStock || rating || priceAt) {
    filter = true;
  }

  const [keyword, setKeyword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (location.pathname !== '/search' && keyword.length !== 0) {
      navigate(`search?keyword=${keyword}`);
    } else if (!filter && keyword.length === 0) {
      navigate('/');
    } else {
      if (keyword.length === 0) {
        search.delete('keyword');
        setSearch(search, {
          replace: true
        });
      } else {
        search.set('keyword', keyword);
        setSearch(search, {
          replace: true
        });
      }
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.search}>
      <input
        type="text"
        className={styles['search-input']}
        placeholder="Search products"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button className={styles['search-button']}>
        <SearchIcon className={styles['search-icon']} />
      </button>
    </form>
  );
};

export default Search;
