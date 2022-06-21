import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Brand.module.scss';

const Brand = () => {
  const [search, setSearch] = useSearchParams();

  const [brandsInServer, setBrandsInServer] = useState([]);

  const [brands, setBrands] = useState(search.get('brands')?.split(',') ?? []);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data: brands } = await axios.get('/api/products/all/brands');

      setBrandsInServer(brands);
    };
    fetchBrands();
  }, []);

  const filter = () => {
    if (brands.length === 0) {
      search.delete('brands');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('brands', brands.join(','));
      setSearch(search, {
        replace: true
      });
    }
  };

  const filterOut = () => {
    setBrands([]);
    search.delete('brands');
    setSearch(search, {
      replace: true
    });
  };

  const onBrandChange = (brand) => (event) => {
    let _brands = brands.slice(); //copy

    if (event.target.checked) {
      _brands.push(brand);
    } else {
      _brands = _brands.filter((_brand) => _brand !== brand);
    }

    setBrands(_brands);
  };

  return (
    <>
      <label className={styles.label}>Brand</label>

      {brandsInServer.map((brand) => (
        <div key={brand} className={styles.checkbox}>
          <input
            type="checkbox"
            checked={brands.includes(brand)}
            onChange={onBrandChange(brand)}
          />
          <label>{brand}</label>
        </div>
      ))}

      <div className={styles.btn}>
        <button onClick={filter}>filter</button>
        {search.get('brands') && (
          <button onClick={filterOut}>filter out</button>
        )}
      </div>
    </>
  );
};

export default React.memo(Brand);
